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

var num_dice=all_letter_dice.length, board_height=11, board_width=18;
var auto_populate_start_col = 1;

var tile_path_start="../img/letter_pieces/";
var tile_path_end=".png";

var blank_dice = "__";

// var selected_tile="a_tile";

var selected_id="none";
var selected_tile_path="none";
var blank_tile_path = tile_path_start + "blank" + tile_path_end;

const valid_urls = new Set(["http://localhost:8000/html/letter_game.html", "https://lakreiss.github.io/html/letter_game.html", "https://liamkreiss.me/html/letter_game.html", "https://www.liamkreiss.me/html/letter_game.html"]);

window.addEventListener('keydown', function(e) { key_press(e); });


//assumes already uppercase
function isVowel(x) {
  x = x.toUpperCase();
  var result;
  result = x == "A" || x == "E" || x == "I" || x == "O" || x == "U";
  return result;
}

function vowel_sort(a, b) {
  a = a.toUpperCase();
  b = b.toUpperCase();
  if (isVowel(a)) {
    if (isVowel(b)) {
      if (a < b) {
        return -1;
      } else {
        return 1;
      }
    } else {
      return -1;
    }
  } else {
    if (isVowel(b)) {
      return 1;
    } else {
      if (a < b) {
        return -1;
      } else {
        return 1;
      }
    }
  }
}

function key_press(e) {
  // alert(e.keyCode);
  switch(e.keyCode) {
    case 37: //left key
      move_tiles("left");
      break;
    case 38: //up key
      move_tiles("up");
      break;
    case 39: //right key
      move_tiles("right");
      break;
    case 40: //down key
      move_tiles("down");
      break;
    // case 84: //t key
    //   transpose();
    //   break;
    // case 74: //j key
    //   auto_populate_sorted_letters(vowel_sort);
    //   break;
    // case 75: //k key
    //   auto_populate_sorted_letters();
    //   break;
    // case 32: //space bar key
    //   // alert("space");
    //   check_solution();
    //   break;
    default:
      // do nothing
  }
}

function get_tile_name(i, j) {
  return "tile" + String.fromCharCode(65+j)+eval(i+1);
}

function get_tile_coords(name) {
  if (name.substring(0, 4) != "tile") {
    alert("illegal tile name");
  } else {
    // alert("tile coords for " + name + " are (" + eval(name.charCodeAt(4) - 65) +", " + parseInt(name.substring(5)) - 1 + ")");
    return [eval(parseInt(name.substring(5)) - 1), name.charCodeAt(4) - 65];
  }
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
  clicked(ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  clicked(ev.target.id);
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
        // alert("cur element: " + click_id + " dice id: " + cur_element.dataset.dice_id);
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
      swap_tiles(selected_id, click_id);
      clear_selections();
    } else {
      alert("error, invalid element click id 2");
    }
  } else {
    alert("error, invalid element selected id");
  }
}

function swap_tiles(tile_1_id, tile_2_id) {
  var tile_1 = document.getElementById(tile_1_id);
  var tile_2 = document.getElementById(tile_2_id);

  var temp_src = tile_1.src;
  var temp_dice_id = tile_1.dataset.dice_id;

  tile_1.src = tile_2.src;
  tile_1.dataset.dice_id = tile_2.dataset.dice_id;

  tile_2.src = temp_src;
  tile_2.dataset.dice_id = temp_dice_id;
}

function roll_dice() {
  animate_dice();
  for (var i=0; i < num_dice; i++) {
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
    for (var i=0; i < num_dice; i++) {
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
      document.getElementById(get_tile_name(i, j)).dataset.dice_id = "none";
    }
  }
}

function download_dice_from_url() {
  var url = window.location.href;
  var letters = [];
  if (url.split("#")[1]) {
    letters = url.split("#")[1].toLowerCase();
    if (letters.length == 16) {
      change_dice_from_letters(letters);
    } else {
      alert("Make sure you include a hashtag (#) followed by 16 letters at the end of the url.");
    }
  }
}

function download_dice_from_custom_letters() {
  var letters = document.getElementById("custom_letters").value.trim().toLowerCase().split('');
  if (letters.length == 16) {
    change_dice_from_letters(letters);
  } else {
    alert(`Make sure you input exactly 16 letters. You currently have ${letters.length} letters.`);
  }
}

function change_dice_from_letters(letters) {
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
}

function upload_dice() {
  //check if the url is valid for uploading
  var url_start = window.location.href.split("#")[0];
  if (!valid_urls.has(url_start)) {
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

function move_tiles(direction) {
  if (direction == "down") {
    if (check_empty_row(board_height - 1)) {
      move_tiles_down();
    }
  } else if (direction == "left") {
    if (check_empty_column(0)) {
      move_tiles_left();
    }
  } else if (direction == "up") {
    if (check_empty_row(0)) {
      move_tiles_up();
    }
  } else if (direction == "right") {
    if (check_empty_column(board_width - 1)) {
      move_tiles_right();
    }
  }
}

function check_empty_row(row_index) {
  for (var col_index = 0; col_index < board_width; col_index++) {
    var cur_id = get_tile_name(row_index, col_index);
    if (!document.getElementById(cur_id).src.includes("blank")) {
      return false;
    }
  }
  return true;
}

function check_empty_column(col_index) {
  for (var row_index = 0; row_index < board_height; row_index++) {
    var cur_id = get_tile_name(row_index, col_index);
    if (!document.getElementById(cur_id).src.includes("blank")) {
      return false;
    }
  }
  return true;
}

function move_tiles_down() {
  for (var row = board_height - 2; row >= 0 ; row--) {
    for (var col = 0; col < board_width; col++) {
      var top_id = get_tile_name(row, col);
      var bottom_id = get_tile_name(row + 1, col);
      swap_tiles(top_id, bottom_id);
    }
  }
}

function move_tiles_up() {
  for (var row = 1; row < board_height; row++) {
    for (var col = board_width - 1; col >= 0; col--) {
      var top_id = get_tile_name(row, col);
      var bottom_id = get_tile_name(row - 1, col);
      swap_tiles(top_id, bottom_id);
    }
  }
}

function move_tiles_left() {
  for (var col = 1; col < board_width; col++) {
    for (var row = 0; row < board_height; row++) {
      var top_id = get_tile_name(row, col);
      var bottom_id = get_tile_name(row, col - 1);
      swap_tiles(top_id, bottom_id);
    }
  }
}

function move_tiles_right() {
  for (var col = board_width - 2; col >= 0; col--) {
    for (var row = board_height - 1; row >= 0; row--) {
      var top_id = get_tile_name(row, col);
      var bottom_id = get_tile_name(row, col + 1);
      swap_tiles(top_id, bottom_id);
    }
  }
}

function transpose() {
  // if (check_for_empty_outside_square()) {
    //do transpose
    transpose_square();
  // } else {
  //   alert("You can only transpose the board if the area outside the upper-left square is empty.");
  // }
}

function transpose_square() {
  var square_size = Math.min(board_width, board_height);
  for (var i = 0; i < square_size; i++) {
    for (var j = i + 1; j < square_size; j++) {
      var top_id = get_tile_name(i, j);
      var bottom_id = get_tile_name(j, i);
      swap_tiles(top_id, bottom_id);
    }
  }
}

function check_for_empty_outside_square() {
  if (board_width > board_height) {
    for (var i = board_height; i < board_width; i++) {
      if (!check_empty_column(i)) {
        return false;
      }
    }
  } else if (board_height > board_width) {
    for (var i = board_width; i < board_height; i++) {
      if (!check_empty_row(i)) {
        return false;
      }
    }
  }
  return true;
}

function auto_populate_sorted_letters(sort_function="") {
  var dice_mapping = {};
  var found_blank = false;

  for (var i=0; i < num_dice; i++) {
    var cur_id = "dice" + i;
    var cur_letter = document.getElementById(cur_id).innerHTML;
    if (cur_letter != blank_dice) {
      if (dice_mapping[cur_letter]) {
        // alert("hello " + dice_mapping[cur_letter]);
        dice_mapping[cur_letter].push(cur_id);
      } else {
        // alert("cur id " + cur_id + " cur_letter " + cur_letter + " mapping " + dice_mapping[cur_letter]);
        dice_mapping[cur_letter] = [cur_id];
      }
    } else {
      found_blank = true;
    }
  }

  if (!found_blank) {
    reset_board();
    var all_letters = Object.keys(dice_mapping);
    if (sort_function == "") {
      all_letters.sort();
    } else {
      all_letters.sort(sort_function);
    }

    var ordered_dice_ids = [];
    for (var i = 0; i < all_letters.length; i++) {
      while (dice_mapping[all_letters[i]].length > 0) {
        ordered_dice_ids.push(dice_mapping[all_letters[i]].pop());
      }
    }
    // alert(ordered_dice_ids);
    click_ordered_dice(all_letters.length, ordered_dice_ids, sort_function);
  }
}

function click_ordered_dice(num_unique_letters, ordered_dice_ids, sort_function) {
  var col = ((board_width - num_unique_letters) / 2) - 1; //minus 1 because i add 1 in the if statement below
  if (sort_function == vowel_sort) {
    col = ((board_width - (num_unique_letters+1)) / 2) - 1; //to account for the blank between vowels and consonants
  }
  var row = 0;
  var last_letter = "";
  // reset_board();
  for (var i = 0; i < ordered_dice_ids.length; i++) {
    var cur_id = ordered_dice_ids[i];
    var cur_dice = document.getElementById(cur_id);
    if (last_letter != cur_dice.innerHTML) {
      row = 0;
      if (sort_function == vowel_sort) { //for vowel sort, add a space between vowels and consonants
        if (isVowel(last_letter) && !isVowel(cur_dice.innerHTML)) {
          col += 1;
        }
      }
      col += 1;
      last_letter = cur_dice.innerHTML;
    }
    clicked(cur_id);
    clicked(get_tile_name(row, col));
    row += 1;
  }
}

function get_words_to_check() {
  var words_to_check = [];

  //first look horizontally
  for (var row = 0; row < board_height; row++) {
    var cur_word = "";
    for (var col = 0; col < board_width; col++) {
      var cur_tile_id = get_tile_name(row, col);
      var cur_tile = document.getElementById(cur_tile_id);
      if (cur_tile.dataset.dice_id != "none") {
        cur_word += document.getElementById(cur_tile.dataset.dice_id).innerHTML.toLowerCase();
      } else {
        if (cur_word.length > 1) {
          words_to_check.push(cur_word);
        }
        cur_word = "";
      }
    }
  }

  //then look vertically
  for (var col = 0; col < board_width; col++) {
    var cur_word = "";
    for (var row = 0; row < board_height; row++) {
      var cur_tile_id = get_tile_name(row, col);
      var cur_tile = document.getElementById(cur_tile_id);
      if (cur_tile.dataset.dice_id != "none") {
        cur_word += document.getElementById(cur_tile.dataset.dice_id).innerHTML.toLowerCase();
      } else {
        if (cur_word.length > 1) {
          words_to_check.push(cur_word);
        }
        cur_word = "";
      }
    }
  }

  // alert(words_to_check);
  return words_to_check;
}

function check_solution() {
  var words_to_check = get_words_to_check();
  if (words_to_check.length > 0) {
    init_word_check_iterator(words_to_check);
  } else {
    //do nothing
  }
  return;
}

function check_word() {
  var word_to_check = document.getElementById("word_check").value.trim();
  var is_word = check_is_alphabetic(word_to_check);

  if (word_to_check == "") {
    alert("Error: you forgot to enter a word!");
  } else if (!is_word) {
    alert("Error: your entry was invalid");
  } else {
    return init_word_check_iterator([word_to_check]);
  }
}

var words_to_check_global;
var single_word_global;

function init_word_check_iterator(words_to_check) {
  words_to_check_global = words_to_check;

  if (words_to_check.length > 1) {
    single_word_global = false;
  } else {
    single_word_global = true;
  }
  is_in_dictionary(next_word());
}

function next_word() {
  if (words_to_check_global.length == 0) {
    if (single_word_global) {
      alert("Congratulations, it looks like your word is valid!");
    } else {
      alert("Congratulations, it looks like all your words are valid!");
    }
  } else {
    return words_to_check_global.pop();
  }
}

function failed_check(illegal_word, similar_words) {
  similar_valid_words = get_similar_valid_words(similar_words);
  alert("Sorry, it looks like your word '" + illegal_word + "' is not a valid word. Here are some similar words that might help you:\n" + similar_valid_words);
}

function get_similar_valid_words(similar_words) {
  all_words = similar_words.replace(/","/g, ',').replace(/"]/g, '').replace(/\["/g, '').split(",");

  valid_letters = new Set();
  for (var i=0; i < num_dice; i++) {
    valid_letters.add(document.getElementById("dice"+i).innerHTML.toLowerCase());
  }

  valid_words = [];
  for (var i = 0; i < all_words.length; i++) {
    var cur_word = all_words[i];
    if (isSuperset(valid_letters, cur_word)) {
      valid_words.push(cur_word);
    }
  }

  return valid_words;
}

function isSuperset(set, word) {
  for (var i = 0; i < word.length; i++) {
    if (!(set.has(word.charAt(i)))) { //purposefully not making this lower case, as words with upper case are proper nouns, and therefore illegal
      return false;
    }
  }
  return true;
}

function is_in_dictionary(word) {
  var url_start = "https://dictionaryapi.com/api/v3/references/collegiate/json/";
  var url_end = "?key=462d1fec-822d-41e6-afa6-986f2581cb46";

  var theUrl = url_start + word + url_end;

  function is_valid(text) {
    if (text[1] != "{") { //real entries have the meta bracket, suggestion entries do not
      // alert(text);
      return failed_check(word, text);
    } else {
      var next_word_to_test = next_word();
      if (next_word_to_test) {
        return is_in_dictionary(next_word_to_test);
      }
    }
  }

  fetch(theUrl)
  .then(function(response) {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text().then(function(text) {
      is_valid(text);
    });
  })
  .catch((error) => {
    console.error('There has been a problem with your fetch operation:', error);
  });

  return;
}

$( function() {
  $( "#dialog" ).dialog({
    autoOpen: false,
    width: 400,
    show: {
      effect: "clip",
      // effect: "bounce",
      duration: 1000
    },
    hide: {
      effect: "clip",
      // effect: "clip",
      // effect: "fade",
      duration: 1000
    }
  });

  $( "#opener" ).on( "click", function() {
    $( "#dialog" ).dialog( "open" );
  });
} );

//*********************INSTRUCTIONS*********************

function display_instructions() {
  var how_to_play = "How to play:\nRoll the letter dice, then connect the letters to form words. Each dice must be used, and each word must connect with the other words. If you want a challenge, only make words with four or more letters.";
  var example = "\n\nIf you need an example to see what a solved board looks like, click the 'Example Solution' button.";
  var arrow_keys = "\n\nUse the arrow keys to shift your board so that you can add letters once you've run into an edge.";
  var how_to_upload = "\n\nWhat is uploading?\nuploading saves the dice roll in your url so that you can share your roll with other people; simply upload, send them the url, and ta-da: you can both solve the same letters.";
  var how_to_download = "\n\nHow to download:\nTo download your own set of dice, simply enter the 16 letters you want in the \"Custom Letters\" box and click Download. \"Q\" will automatically be converted to \"Qu\". Make sure you include exactly 16 letters; the website will not accept the entry otherwise.";
  alert(how_to_play + example + arrow_keys + how_to_upload + how_to_download);
}

function display_advanced() {
  var arrow_keys = "\n\nUse the arrow keys to move your letter board around. This can be helpful if your solution branches off in one direction.";
  var space = "\n\nThe space bar checks your words against Merriam-Webster's dictionary. This includes abbreviations, some proper nouns, and words that are shorter than four letters, and ignores single tiles, so passing this check doesn't necessarily mean you've completed the puzzle, it just means that all your words are real words. \nIf you have a word attempt that isn't quite right, this feature will suggest similar words (which may or may not be possible to build with the given tiles).";

  var t = "\n\nThe 'Transpose' button transposes the left side of the board while keeping the right-most side the same."
  // var t;
  // if (board_width > board_height) {
  //   var num_cols = board_width - board_height;
  //   t = "\n\nThe 'Transpose' button transposes the board, although it only works if the " + num_cols + " right-most columns are empty.";
  // } else if (board_height > board_width) {
  //   var num_rows = board_height - board_width;
  //   t = "\n\nThe 'Transpose' button transposes the board, although it only works if the " + num_rows + " bottom-most rows are empty.";
  // } else {
  //   t = "\n\nThe 'Transpose' button transposes the board.";
  // }

  var j = "\n\nThe 'Vowel Sort' button sorts the dice on the board by vowels and consonants, with an empty column separating them.";
  var k = "\n\nThe 'Sort' button sorts the dice on the board alphabetically.";

  alert("You can use keyboard inputs to control the game, too!" + arrow_keys + t + j + k);

}

function display_faqs() {
  var move_tiles = "Either click the tile you want to move, and then click the destination, or drag a letter to where you want it to go.";
  var scrabble_tiles = "The board uses scrabble tiles because they look nice. The numbers don't mean anything; there are no points in this game. If you really want them to have meaning, you can sum up the points of your letters, and think of the total as the roll's 'difficulty.'";
  var found_bug = "If you find a bug, or something that you think could be improved, please email me with a detailed explanation of your findings or thoughts. If you can take a picture or video of the problem and include it, that'd be great. The more specific you can be, the better. Thank you! My email is available from the email icon below.";
  alert("How do I move tiles?\n" + move_tiles + "\n\nWhy are there scrabble tiles on the board?\n" + scrabble_tiles + "\n\nWhat do I do if I found a bug, or want something changed?\n" + found_bug);
}

//*********************HELPER FUNCTIONS*********************

function check_is_alphabetic(input) {
  var regex = new RegExp(/^[a-z]+$/i, );
  return regex.test(input);
}
