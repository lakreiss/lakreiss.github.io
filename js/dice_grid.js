var num_letters=16, board_height=12, board_width=18;

var tile_path_start="img/letter_pieces/";
var selected_tile="a_tile";
var tile_path_end=".jpg";

function get_tile_name(i, j) {
  return String.fromCharCode(65+j)+eval(i+1);
}

function clicked(tile_id) {
  if (tile_id.includes("dice")) { //dice was clicked, don't use src
    alert("clicked: " + tile_id);

  } else {
    var new_tile_path = tile_path_start + selected_tile + tile_path_end;
    // alert("tile id: " + tile_id + "new tile: " + document.getElementById(tile_id));
    // alert("new tile: " + new_tile_path);
    document.getElementById(tile_id).src = new_tile_path;

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
  clear_board();
}

function reset_board() {
  //change
  clear_board();
}

function clear_board() {
  for (var i=0; i<board_height; i++) {
    for (var j=0; j<board_width; j++) {
      document.getElementById(get_tile_name(i, j)).src = tile_path_start + "blank" + tile_path_end;
    }
  }
}
