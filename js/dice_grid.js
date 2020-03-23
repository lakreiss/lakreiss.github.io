var num_dice=16, board_height=12, board_width=18;

var tile_path_start="img/letter_pieces/";
var tile_path_end=".png";

var blank_dice = "__";

// var selected_tile="a_tile";

var selected_id="none";
var selected_tile_path="none";
var blank_tile_path = tile_path_start + "blank" + tile_path_end;

function get_tile_name(i, j) {
  return "tile" + String.fromCharCode(65+j)+eval(i+1);
}

function get_tile_path(dice_string) {
  return tile_path_start + dice_string.toLowerCase() + "_tile" + tile_path_end;
}

//cur_element must be a dice
function highlight_dice(cur_element) {
  cur_element.className = "dice highlighted_dice";
  selected_id = cur_element.id;
  selected_tile_path = get_tile_path(cur_element.innerHTML);
}

//cur_element must be a tile
function highlight_tile(cur_element) {
  cur_element.style.opacity = "0.7";
  selected_id = cur_element.id;
  selected_tile_path = cur_element.src;
}

function unhighlight_tile(cur_tile) {
  cur_tile.style.opacity = "1";
}

function clear_selections() {
  selected_id = "none";
  selected_tile_path = "none";
}

function set_dice_to_unused(dice_id) {
  document.getElementById(dice_id).className = "dice unused_dice";
}

function set_dice_to_used(dice_id) {
  document.getElementById(dice_id).className = "dice used_dice";
}

//CODE FOR DRAGGING: TAKEN FROM https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_draganddrop

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  // ev.preventDefault();
  clicked(ev.target.id);
  // ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  clicked(ev.target.id);
  //
  // ev.preventDefault();
  // var data = ev.dataTransfer.getData("text");
  // ev.target.appendChild(document.getElementById(data));
}

//END CODE FOR DRAGGING

function clicked(click_id) {
  var cur_element = document.getElementById(click_id);
  if (selected_id == "none") {
    if (click_id.includes("dice")) {
      // alert("clicked dice")
      if (cur_element.className != "dice used_dice") {
        if (cur_element.innerHTML != blank_dice) {
          highlight_dice(cur_element);
        }
      }
    } else if (click_id.includes("tile")){
      if (!cur_element.src.includes("blank")) {
        highlight_tile(cur_element);
      }
    } else {
      alert("error, invalid element click id 1");
    }
  } else if (selected_id.includes("dice")) {
    if (click_id.includes("dice")) {
      // alert("clicked dice")
      if (cur_element.className == "dice used_dice") {
        //do nothing
      } else if (cur_element.className == "dice highlighted_dice") {
        //do nothing
      } else if (cur_element.className == "dice unused_dice") {
        set_dice_to_unused(selected_id);
        highlight_dice(cur_element);
      } else {
        alert("invalid dice class name");
      }
    } else if (click_id.includes("tile")) {
      if (cur_element.dataset.dice_id != "none") {
        set_dice_to_unused(cur_element.dataset.dice_id);
      }
      cur_element.src = selected_tile_path;
      cur_element.dataset.dice_id = selected_id;
      set_dice_to_used(selected_id);

      clear_selections();
    } else {
      alert("error, invalid element click id 2");
    }
  } else if (selected_id.includes("tile")) {

    var selected_tile = document.getElementById(selected_id);
    unhighlight_tile(selected_tile);
    //TODO: change this
    if (click_id.includes("dice")) {
      if (selected_tile.dataset.dice_id == click_id) {
        selected_tile.src = blank_tile_path;
        selected_tile.dataset.dice_id = "none";
        cur_element.className = "dice unused_dice";
        clear_selections();
      } else if (cur_element.className == "dice used_dice") {
        //do nothing
      } else if (cur_element.className == "dice unused_dice") {
        highlight_dice(cur_element);
      } else {
        alert("invalid dice class name");
      }
    } else if (click_id.includes("tile")) {
      temp_src = selected_tile_path;
      temp_dice_id = selected_tile.dataset.dice_id;

      selected_tile.src = cur_element.src;
      selected_tile.dataset.dice_id = cur_element.dataset.dice_id;

      cur_element.src = temp_src;
      cur_element.dataset.dice_id = temp_dice_id;

      clear_selections();
    } else {
      alert("error, invalid element click id 2");
    }
  } else {
    alert("error, invalid element selected id");
  }
}

var all_letter_dice = [
  ["U", "S", "A", "D", "N", "R"],
  ["D", "L", "P", "T", "N", "B"],
  ["A", "C", "S", "D", "R", "E"],
  ["I", "W", "V", "Y", "J", "T"],
  ["U", "E", "O", "E", "A", "I"],
  ["C", "G", "R", "M", "N", "R"],
  ["E", "K", "I", "Qu", "X", "Z"],
  ["A", "L", "H", "S", "I", "W"],
  ["A", "P", "B", "F", "O", "E"],
  ["M", "C", "P", "N", "L", "D"],
  ["I", "C", "P", "G", "N", "T"],
  ["M", "T", "Y", "H", "O", "H"],
  ["S", "L", "U", "G", "E", "R"],
  ["T", "R", "E", "L", "T", "A"],
  ["E", "A", "O", "E", "U", "I"],
  ["W", "O", "T", "U", "O", "F"]
];

function roll_dice() {
  animate_dice();
  for (var i=0; i < all_letter_dice.length; i++) {
    var index = Math.floor(Math.random() * 6);
    document.getElementById("dice"+i).innerHTML = all_letter_dice[i][index];
  }
  reset_board();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function animate_dice() {
  var num_dice_bounces = 10;
  for (var j=0; j < num_dice_bounces; j++) {
    for (var i=0; i < all_letter_dice.length; i++) {
      var index = Math.floor(Math.random() * 6);
      document.getElementById("dice"+i).innerHTML = all_letter_dice[i][index];
    }
    await sleep(50);
  }
}

function reset_board() {
  reset_dice_class();
  clear_board();
}

function reset_dice_class() {
  for (var i=0; i < num_dice; i++) {
    var cur_id = "dice" + i;
    document.getElementById(cur_id).className = "dice unused_dice";
  }
}

function clear_board() {
  for (var i=0; i<board_height; i++) {
    for (var j=0; j<board_width; j++) {
      document.getElementById(get_tile_name(i, j)).src = tile_path_start + "blank" + tile_path_end;
    }
  }
}

function upload_dice() {
  var letters = window.location.href.split("#")[1].toLowerCase();
  if (letters.length == 16) {
    for (var i = 0; i < letters.length; i++) {
      var cur_letter = letters[i];
      var regexp = /^[a-z]/;
      if (regexp.test(cur_letter)) {
        var cur_id = "dice" + i;
        if (cur_letter == "q") {
          document.getElementById(cur_id).innerHTML = "Qu";
        } else {
          document.getElementById(cur_id).innerHTML = cur_letter.toUpperCase();
        }
        reset_board();
      } else {
        alert("Make sure you only use valid letters in the url.");
      }
    }
  } else {
    alert("Make sure you include a hashtag (#) followed by 16 letters at the end of the url.");
  }
}

function download_dice() {
  var url_start = window.location.href.split("#")[0];

  if (url_start != "http://localhost:8000/letter_game.html" && url_start != "https://lakreiss.github.io/letter_game.html") {
    alert("Are you trying to hack in to my website! Please don\'t!");
  } else {
    var letters_to_add = "#";
    for (var i = 0; i < num_dice; i++) {
      var cur_id = "dice" + i;
      if (document.getElementById(cur_id).innerHTML == "Qu") {
        letters_to_add += "q"
      } else {
        letters_to_add += document.getElementById(cur_id).innerHTML.toLowerCase();
      }
    }
    window.location = url_start + letters_to_add;
  }
}

function display_instructions() {
  var how_to_play = "Roll the letter dice, then connect the letters to form words. If you want a challenge, only make words with four or more letters.";
  var how_to_upload = "To upload your own set of dice, include \"#xxxxxxxxxxxxxxxx\" at the end of the url, where you substitute the xs for the letters you want. \"Q\" will automatically be converted to \"Qu\". Make sure you include 16 letters; the website will not accept the entry otherwise.";
  var how_to_download = "Downloading saves the dice roll in your url so that you can share your roll with other people; simply download, send them the url, have them upload, and ta-da: you can both solve the same letters.";
  alert("How to play:\n" + how_to_play + "\n\nHow to upload:\n" + how_to_upload + "\n\nWhat is downloading?\n" + how_to_download);
}

function display_faqs() {
  var move_tiles = "Either click the tile you want to move, and then click the destination, or drag a letter to where you want it to go.";
  var scrabble_tiles = "The board uses scrabble tiles because they look nice. The numbers don't mean anything; there are no points in this game. If you really want them to have meaning, you can sum up the points of your letters, and think of the total as the roll's 'difficulty.'";
  var found_bug = "If you find a bug, or something that you think could be improved, please email me with a detailed explanation of your findings or thoughts. If you can take a picture or video of the problem and include it, that'd be great. The more specific you can be, the better. Thank you! My email is available from the email icon below.";
  alert("How do I move tiles?\n" + move_tiles + "\n\nWhy are there scrabble tiles on the board?\n" + scrabble_tiles + "\n\nWhat do I do if I found a bug, or want something changed?\n" + found_bug);
}
