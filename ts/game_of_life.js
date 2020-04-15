var BOARD_HEIGHT = 20, BOARD_WIDTH = 22;
var game_is_active = false;
var interval; //not sure what type this is
var cur_element, cur_tile_coords, num_neighbors, cur_tile, cur_row, cur_board, next_board;
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
    cur_tile_coords = get_tile_coords(tile_name);
    // console.log(!cur_board[cur_tile_coords[0]][cur_tile_coords[1]]);
    cur_board[cur_tile_coords[0]][cur_tile_coords[1]] = !cur_board[cur_tile_coords[0]][cur_tile_coords[1]];
    // print_board();
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
            setInterval(update_board, 300);
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
function update_board() {
    if (game_is_active) {
        console.log("game is active");
        //get next states
        next_board = [];
        for (var i = 0; i < BOARD_HEIGHT; i++) {
            next_board.push([]);
            for (var j = 0; j < BOARD_WIDTH; j++) {
                num_neighbors = get_num_alive_neighbors(i, j);
                if (cur_board[i][j]) { //cur tile is alive
                    if (num_neighbors == 2 || num_neighbors == 3) {
                        next_board[i][j] = true;
                    }
                    else {
                        next_board[i][j] = false;
                    }
                }
                else { //cur tile is dead
                    if (num_neighbors == 3) {
                        next_board[i][j] = true;
                    }
                    else {
                        next_board[i][j] = false;
                    }
                }
            }
        }
        //set next states //TODO write this
        for (var i = 0; i < BOARD_HEIGHT; i++) {
            for (var j = 0; j < BOARD_WIDTH; j++) {
                if (next_board[i][j] != cur_board[i][j]) {
                    cur_board[i][j] = next_board[i][j];
                    toggle_tile(get_tile_name(i, j));
                }
            }
        }
    }
    else {
        console.log("game is not active");
    }
}
function get_num_alive_neighbors(row, col) {
    //TODO write this
    var total_count = 0;
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            if (i == 0 && j == 0) {
                //skip, main cell
            }
            else {
                if (row + i < 0 || row + i >= BOARD_HEIGHT || col + j < 0 || col + j >= BOARD_WIDTH) {
                    //skip, out of bounds
                }
                else {
                    total_count += cur_board[row + i][col + j] ? 1 : 0;
                }
            }
        }
    }
    return total_count;
}
function print_board() {
    var output = "";
    for (var i = 0; i < BOARD_HEIGHT; i++) {
        output += "\n";
        for (var j = 0; j < BOARD_WIDTH; j++) {
            output += (cur_board[i][j] == true ? "T" : "f") + " ";
        }
    }
    console.log(output);
}
