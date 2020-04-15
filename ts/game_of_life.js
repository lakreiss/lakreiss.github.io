var BOARD_HEIGHT = 20, BOARD_WIDTH = 22;
var game_is_active = false;
var interval; //not sure what type this is
var cur_element, cur_tile, cur_row, cur_board, next_board;
function get_tile_name(i, j) {
    return "tile" + String.fromCharCode(65 + j) + (i + 1).toString();
}
function get_tile_coords(name) {
    if (name.substring(0, 4) != "tile") {
        alert("illegal tile name");
    }
    else {
        // alert("tile coords for " + name + " are (" + eval(name.charCodeAt(4) - 65) +", " + parseInt(name.substring(5)) - 1 + ")");
        return [parseInt(name.substring(5)) - 1, name.charCodeAt(4) - 65];
    }
}
function build_empty_board() {
    cur_board = [];
    for (var i = 0; i < BOARD_HEIGHT; i++) {
        cur_board.push([]);
        for (var j = 0; j < BOARD_WIDTH; j++) {
            cur_tile = get_tile_name(i, j);
            cur_board[i][j] = false;
            document.write("<div class=\"tile\" id=\"" + cur_tile + "\" onclick=\"toggle_tile(\'" + cur_tile + "\')\"></div>");
        }
        document.writeln("<br>");
    }
}
function toggle_tile(tile_name) {
    cur_element = document.getElementById(tile_name);
    cur_element.classList.toggle("tile_on");
}
function update_board() {
    if (game_is_active) {
        console.log("game is active");
        //get next states
        //set next states
    }
    else {
        console.log("game is not active");
    }
}
function start_game() {
    if (game_is_active) {
        //do nothing because game is already active
    }
    else {
        game_is_active = true;
        if (interval) {
            //do nothing because an interval already exists
        }
        else {
            setInterval(update_board, 33);
        }
    }
}
function stop_game() {
    if (!game_is_active) {
        //do nothing
    }
    else {
        game_is_active = false;
    }
}
