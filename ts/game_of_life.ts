const BOARD_HEIGHT: number = 20, BOARD_WIDTH: number = 22;
var game_is_active: boolean = false;
var interval; //not sure what type this is
var cur_element: Element, num_neighbors: number, cur_tile: string, cur_row: boolean[], cur_board: boolean[][], next_board: boolean[][];

function get_tile_name(i: number, j: number): string {
  return "tile" + String.fromCharCode(65+j) + (i+1).toString();
}

function get_tile_coords(name: string): number[] {
  if (name.substring(0, 4) != "tile") {
    alert("illegal tile name");
  } else {
    // alert("tile coords for " + name + " are (" + eval(name.charCodeAt(4) - 65) +", " + parseInt(name.substring(5)) - 1 + ")");
    return [parseInt(name.substring(5)) - 1, name.charCodeAt(4) - 65];
  }
}

function build_empty_board(): void {
  cur_board = [];
  for (var i: number = 0; i < BOARD_HEIGHT; i++) {
    cur_board.push([]);
    for (var j: number = 0; j < BOARD_WIDTH; j++) {
      cur_tile = get_tile_name(i, j);
      cur_board[i][j] = false;
      document.write("<div class=\"tile\" id=\""+cur_tile+"\" onclick=\"toggle_tile(\'"+cur_tile+"\')\"></div>");
    }
    document.writeln("<br>");
  }
}

function toggle_tile(tile_name: string): void {
  cur_element = document.getElementById(tile_name);
  cur_element.classList.toggle("tile_on");
}

function start_game(): void {
  if (game_is_active) {
    //do nothing because game is already active
  } else {
    game_is_active = true;
    if (interval) {
      //do nothing because an interval already exists
    } else {
      setInterval(update_board, 33);
    }
  }
}

function stop_game(): void {
  if (!game_is_active) {
    //do nothing
  } else {
    game_is_active = false;
  }
}

function update_board() {

  if (game_is_active) {
    console.log("game is active");
    //get next states
    next_board = [];
    for (var i: number = 0; i < BOARD_HEIGHT; i++) {
      next_board.push([]);
      for (var j: number = 0; j < BOARD_WIDTH; j++) {
        num_neighbors = get_num_neighbors(i, j);
        //TODO add if statemtns for whether to set to true or false
        next_board[i][j] = false;
      }
    }

    //set next states //TODO write this
  } else {
    console.log("game is not active");

  }
}

function get_num_neighbors(row: number, col: number): number {
  //TODO write this
  return 0;
}
