var num_dice=16, board_height=12, board_width=18;

var tile_path_start="img/letter_pieces/";
var tile_path_end=".png";

var blank_dice = "__";

// var selected_tile="a_tile";

var selected_id="none";
var selected_tile_path="none";
var blank_tile_path = tile_path_start + "blank" + tile_path_end;

window.addEventListener('keydown', function(e) { key_press(e); });

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
    case 32: //space bar key
      // alert("space");
      // check_solution();
      break;
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
      swap_tiles(selected_id, click_id);
      // var temp_src = selected_tile_path;
      // var temp_dice_id = selected_tile.dataset.dice_id;
      //
      // selected_tile.src = cur_element.src;
      // selected_tile.dataset.dice_id = cur_element.dataset.dice_id;
      //
      // cur_element.src = temp_src;
      // cur_element.dataset.dice_id = temp_dice_id;

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

function move_tiles(direction) {

  if (direction == "down") {
    if (check_empty_row(board_height - 1)) {
      move_tiles_down();
    } else {
      //do nothing
    }
  } else if (direction == "left") {
    if (check_empty_column(0)) {
      move_tiles_left();
    } else {
      //do nothing
    }
  } else if (direction == "up") {
    if (check_empty_row(0)) {
      move_tiles_up();
    } else {
      //do nothing
    }
  } else if (direction == "right") {
    if (check_empty_column(board_width - 1)) {
      move_tiles_right();
      // alert(left_rotation_mapping);
    } else {
      //do nothing
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


//I TRIED TO DO SOMETHING COOL WITH ROTATIONS, BUT IT DIDN'T WORK. MAYBE I'LL COME BACK TO IT EVENTUALLY, BUT I'LL JUST DO IT THE BORING WAY FOR NOW
// function move_tiles(direction) {
//   //first, assume direction is down
//
//   var rows = board_height, cols = board_width;
//   var delta_i = -1, delta_j = 1;
//   var starting_i = rows - 2, starting_j = 0;
//
//   var rotated_values = [starting_i, starting_j, delta_i, delta_j, rows, cols];
//
//   if (direction == "down") {
//     //do nothing
//   } else if (direction == "left") {
//     rotated_values = rotate_all_values(rotated_values, 1);
//   } else if (direction == "up") {
//     rotated_values = rotate_all_values(rotated_values, 2);
//   } else if (direction == "right") {
//     rotated_values = rotate_all_values(rotated_values, 3);
//   }
//
//   starting_i = rotated_values[0];
//   starting_j = rotated_values[1];
//   delta_i = rotated_values[2];
//   delta_j = rotated_values[3];
//   rows = rotated_values[4];
//   cols = rotated_values[5];
//
//   if (check_bottom_is_empty(starting_i, starting_j, delta_i, delta_j, rows, cols)) {
//     move_tiles_down(starting_i, starting_j, delta_i, delta_j, rows, cols)
//     alert("tried to move letters " + direction);
//     // alert(left_rotation_mapping);
//   } else {
//     alert("bottom_has_letters");
//   }
// }
//
// function rotate_all_values(all_values, num_rotations) {
//   if (num_rotations == 0) {
//     return all_values;
//   }  else {
//     var new_values = [];
//
//     var starting_i = all_values[0];
//     var starting_j = all_values[1];
//     var delta_i = all_values[2];
//     var delta_j = all_values[3];
//     var rows = all_values[4];
//     var cols = all_values[5];
//
//     //get the new starting position
//     console.log("cur starting pos: " + starting_i + ", " + starting_j);
//     var new_starting_coords = get_tile_coords(left_rotation_mapping[get_tile_name(starting_i, starting_j)]);
//
//     console.log("new starting pos: " + new_starting_coords[0] + ", " + new_starting_coords[1]);
//     new_values[0] = new_starting_coords[0];
//     new_values[1] = new_starting_coords[1];
//
//     //get the new deltas and row/col sizes
//     var new_deltas_sizes = rotate_left(delta_i, delta_j, rows, cols);
//
//     // alert("old deltas: " + delta_i + ", " + delta_j + " new deltas: " + new_deltas_sizes[0] + ", " + new_deltas_sizes[1]);
//     // alert("old rows cols: " + rows + ", " + cols + " new rows cols: " + new_deltas_sizes[2] + ", " + new_deltas_sizes[3]);
//     new_values[2] = new_deltas_sizes[0];
//     new_values[3] = new_deltas_sizes[1];
//     new_values[4] = new_deltas_sizes[2];
//     new_values[5] = new_deltas_sizes[3];
//
//     return rotate_all_values(new_values, num_rotations - 1);
//   }
// }
//
// function move_tiles_down(starting_i, starting_j, delta_i, delta_j, rows, cols) { //moves them down relative to the rotations, so it might not actually move down
//   for (var row = starting_i; row >= 0 && row < rows; row += delta_i) {
//     for (var col = starting_j; col >= 0 && col < cols; col += delta_j) {
//       var top_id = get_tile_name(row, col);
//       var bottom_id = get_tile_name(row - delta_i, col);
//       swap_tiles(top_id, bottom_id);
//     }
//   }
// }
//
// function check_bottom_is_empty(starting_i, starting_j, delta_i, delta_j, rows, cols) {
//   var row_index = starting_i - delta_i;
//   for (var col_index = starting_j; col_index >= 0 && col_index < cols; col_index += delta_j) {
//     var cur_id = get_tile_name(row_index, col_index);
//     console.log(cur_id);
//     if (!document.getElementById(cur_id).src.includes("blank")) {
//       return false;
//     }
//   }
//   return true;
// }
//
// var left_rotation_mapping = {};
// left_rotation_mapping[get_tile_name(0, 1)] = get_tile_name(1, board_width-1);
// left_rotation_mapping[get_tile_name(1, board_width-1)] = get_tile_name(board_height, board_width-2);
// left_rotation_mapping[get_tile_name(board_height-1, board_width-2)] = get_tile_name(board_height-2, 0);
// left_rotation_mapping[get_tile_name(board_height-2, 0)] = get_tile_name(0, 1);
//
// function rotate_left(x, y, rows, cols) {
//   return [y, -x, cols, rows];
// }

function display_instructions() {
  var how_to_play = "Roll the letter dice, then connect the letters to form words. If you want a challenge, only make words with four or more letters.";
  var arrow_keys = "\n\nUse the arrow keys to shift your board so that you can add letters once you've run into an edge.";
  var how_to_upload = "To upload your own set of dice, include \"#xxxxxxxxxxxxxxxx\" at the end of the url, where you substitute the xs for the letters you want. \"Q\" will automatically be converted to \"Qu\". Make sure you include 16 letters; the website will not accept the entry otherwise.";
  var how_to_download = "Downloading saves the dice roll in your url so that you can share your roll with other people; simply download, send them the url, have them upload, and ta-da: you can both solve the same letters.";
  alert("How to play:\n" + how_to_play + arrow_keys + "\n\nHow to upload:\n" + how_to_upload + "\n\nWhat is downloading?\n" + how_to_download);
}

function display_advanced() {
  var arrow_keys = "Use the arrow keys to move your letter board around. This can be helpful if your solution branches off in one direction.";
  // var space_bar = "";
  alert("You can use keyboard inputs to control the game, too!\n\n" + arrow_keys);

}

function display_faqs() {
  var move_tiles = "Either click the tile you want to move, and then click the destination, or drag a letter to where you want it to go.";
  var scrabble_tiles = "The board uses scrabble tiles because they look nice. The numbers don't mean anything; there are no points in this game. If you really want them to have meaning, you can sum up the points of your letters, and think of the total as the roll's 'difficulty.'";
  var found_bug = "If you find a bug, or something that you think could be improved, please email me with a detailed explanation of your findings or thoughts. If you can take a picture or video of the problem and include it, that'd be great. The more specific you can be, the better. Thank you! My email is available from the email icon below.";
  alert("How do I move tiles?\n" + move_tiles + "\n\nWhy are there scrabble tiles on the board?\n" + scrabble_tiles + "\n\nWhat do I do if I found a bug, or want something changed?\n" + found_bug);
}
