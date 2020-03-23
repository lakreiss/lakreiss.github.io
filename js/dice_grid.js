var num_dice=16, board_height=12, board_width=18;

var tile_path_start="img/letter_pieces/";
var tile_path_end=".jpg";

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
  cur_element.className = "highlighted_dice";
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
  document.getElementById(dice_id).className = "dice";
}

function set_dice_to_used(dice_id) {
  document.getElementById(dice_id).className = "used_dice";
}

function clicked(click_id) {
  var cur_element = document.getElementById(click_id);
  if (selected_id == "none") {
    if (click_id.includes("dice")) {
      // alert("clicked dice")
      if (cur_element.className != "used_dice") {
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
      if (cur_element.className == "used_dice") {
        //do nothing
      } else if (cur_element.className == "highlighted_dice") {
        //do nothing
      } else if (cur_element.className == "dice") {
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
        cur_element.className = "dice";

      } else if (cur_element.className == "used_dice") {
        //do nothing
      } else if (cur_element.className == "dice") {
        highlight_dice(cur_element);
      } else {
        alert("invalid dice class name");
      }
    } else if (click_id.includes("tile")) {
      temp_src = selected_tile.src;
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
  for (var i=0; i < all_letter_dice.length; i++) {
    var index = Math.floor(Math.random() * 6);
    document.getElementById("dice"+i).innerHTML = all_letter_dice[i][index];
  }
  reset_board();
}

function reset_board() {
  reset_dice_class();
  clear_board();
}

function reset_dice_class() {
  for (var i=0; i < num_dice; i++) {
    var cur_id = "dice" + i;
    document.getElementById(cur_id).className = "dice";
  }
}

function clear_board() {
  for (var i=0; i<board_height; i++) {
    for (var j=0; j<board_width; j++) {
      document.getElementById(get_tile_name(i, j)).src = tile_path_start + "blank" + tile_path_end;
    }
  }
}
