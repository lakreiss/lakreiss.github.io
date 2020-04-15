var BOARD_HEIGHT = 20, BOARD_WIDTH = 22;
var game_is_active = false, interval_exists = false;
var cur_element, cur_select_element, cur_shape_name, click_type, num_neighbors, cur_tile, cur_row, cur_board, next_board;
function get_tile_name(i, j) {
    if (i < 0 || i >= BOARD_HEIGHT || j < 0 || j >= BOARD_WIDTH) {
        return null;
    }
    return "tile" + String.fromCharCode(65 + j) + (i + 1).toString();
}
function get_tile_coords(name) {
    if (name.substring(0, 4) != "tile") {
        // alert("illegal tile name");
        return null;
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
            document.write("<div class=\"tile\" id=\"" + cur_tile + "\" onclick=\"clicked(\'" + cur_tile + "\')\"></div>");
        }
        document.writeln("<br>");
    }
}
function toggle_tile(tile_name) {
    cur_element = document.getElementById(tile_name);
    cur_element.classList.toggle("tile_on");
    var cur_tile_coords = get_tile_coords(tile_name);
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
        if (interval_exists) {
            //do nothing because an interval already exists
        }
        else {
            setInterval(update_board, 300);
            interval_exists = true;
            console.log("set interval");
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
function step_board() {
    update_board(true);
}
function clear_board() {
    for (var i = 0; i < BOARD_HEIGHT; i++) {
        for (var j = 0; j < BOARD_WIDTH; j++) {
            if (cur_board[i][j] == true) {
                toggle_tile(get_tile_name(i, j));
            }
        }
    }
}
function update_board(overwrite_game_is_active) {
    if (overwrite_game_is_active === void 0) { overwrite_game_is_active = false; }
    if (game_is_active || overwrite_game_is_active) {
        // console.log("game is active");
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
                    toggle_tile(get_tile_name(i, j));
                }
            }
        }
    }
    else {
        // console.log("game is not active");
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
function add_type(type, button_id) {
    //remove past type //I GUESS I COULD SAVE A REFERENCE TO THE ONE I ACTUALLY NEED TO TOGGLE, BUT OH WELL
    var all_shape_buttons = document.getElementsByClassName("shape_button");
    for (var i = 0; i < all_shape_buttons.length; i++) {
        if (all_shape_buttons[i].className.includes("button_active")) {
            all_shape_buttons[i].classList.toggle("button_active");
        }
    }
    //set new type
    document.getElementById(button_id).classList.toggle("button_active");
    click_type = type;
}
function clicked(tile_name) {
    if (click_type == "click") { //normal click
        toggle_tile(tile_name);
    }
    else {
        cur_select_element = (document.getElementById(click_type));
        cur_shape_name = cur_select_element.options[cur_select_element.selectedIndex].text.toLowerCase();
        build_shape(Shape.get_shape(cur_shape_name), tile_name);
    }
}
function build_shape(cur_shape, top_left_tile) {
    var cur_tile_coords = get_tile_coords(top_left_tile);
    for (var i = 0; i < cur_shape.length; i++) {
        for (var j = 0; j < cur_shape[0].length; j++) {
            if (cur_shape[i][j]) {
                cur_tile = get_tile_name(cur_tile_coords[0] + i, cur_tile_coords[1] + j);
                if (cur_tile) {
                    toggle_tile(cur_tile);
                }
            }
        }
    }
}
//SHAPE CLASS
var Shape = /** @class */ (function () {
    function Shape() {
    }
    Shape.get_shape = function (shape_name) {
        if (Shape.all_shapes.get(shape_name)) {
            return Shape.all_shapes.get(shape_name);
        }
        else {
            console.log("Error: shape " + shape_name + " is not implemented");
            return [[true]];
        }
    };
    Shape.all_shapes = new Map([
        ['block', [
                [true, true],
                [true, true]
            ]],
        ['bee-hive', [
                [false, true, true, false],
                [true, false, false, true],
                [false, true, true, false]
            ]],
        ['loaf', [
                [false, true, true, false],
                [true, false, false, true],
                [false, true, false, true],
                [false, false, true, false]
            ]],
        ['boat', [
                [true, true, false],
                [true, false, true],
                [false, true, false]
            ]],
        ['tub', [
                [false, true, false],
                [true, false, true],
                [false, true, false]
            ]],
        ['blinker', [
                [true, true, true]
            ]],
        ['toad', [
                [false, true, true, true],
                [true, true, true, false]
            ]],
        ['beacon', [
                [true, true, false, false],
                [true, false, false, false],
                [false, false, false, true],
                [false, false, true, true]
            ]],
        ['penta-decathlon', [
                [false, false, true, false, false, false, false, true, false, false],
                [true, true, false, true, true, true, true, false, true, true],
                [false, false, true, false, false, false, false, true, false, false]
            ]],
        ['ten', [
                [true, true, true, true, true, true, true, true, true, true]
            ]]
    ]); // using tuples to define values: [string, number][]
    return Shape;
}());
