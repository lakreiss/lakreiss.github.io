var i, j, k, IsOver=true, IsStart0, Start, Start0, num_letters=16, board_height=12, board_width=18, IsRunning=false, LastEvent="";
var tile_path_start="img/letter_pieces/";
var selected_tile="a_tile";
var tile_path_end=".jpg";
ImgNum = new Array(board_height);
for (i=0; i<board_height; i++) {
  ImgNum[i] = new Array(board_width);
}

function clicked(tile_id, i, j) {
  var new_tile_path = tile_path_start + selected_tile + tile_path_end;
  // alert("tile id: " + tile_id + "new tile: " + document.getElementById(tile_id));
  // alert("new tile: " + new_tile_path);
  document.getElementById(tile_id).src = new_tile_path;

}
