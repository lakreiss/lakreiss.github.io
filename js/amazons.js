var board_size = 8;
var canvas_size = 400;
var square_length = canvas_size / board_size;
var board_color_dark = "#d18b47";
var board_color_light = "#ffce9e";
var selected_color = "#ffff0080";
var see_through_color = "#00000000";
var black_queen_on_dark, black_queen_on_light, white_queen_on_dark, white_queen_on_light;
var board = [];

var selected_square;

function setup() {  
    createCanvas(canvas_size, canvas_size);

    black_queen_on_dark = loadImage('../img/amazons/black_queen_on_dark.png');
    black_queen_on_light = loadImage('../img/amazons/black_queen_on_light.png');
    white_queen_on_dark = loadImage('../img/amazons/white_queen_on_dark.png');
    white_queen_on_light = loadImage('../img/amazons/white_queen_on_light.png');

    create_board();
}

function draw() {
    draw_board();
}

function create_board(){
    for (var i = 0; i < board_size; i++) {
        var row = [];
        for (var j = 0; j < board_size; j++) {
            if ((i + j) % 2 == 0) {
                row.push(new Square(i, j, "light"));
            } else {
                row.push(new Square(i, j, "dark"));
            }
        }
        board.push(row);
    }
}

function draw_board(){
    noStroke(); 
    for (var i = 0; i < board_size; i++) {
        for (var j = 0; j < board_size; j++) {
            var cur_square = board[i][j];
            if (cur_square.has_queen()) {
                draw_queen(cur_square.x, cur_square.y, cur_square.get_queen_image());
            } else {
                draw_square(cur_square.x, cur_square.y, cur_square.fill_color);
            }

            if (cur_square.is_selected()) {
                draw_square(cur_square.x, cur_square.y, selected_color);
            }
        }
    }

    stroke(50);
    fill(0, 0, 0, 0); //set fill to see-through
    rect(0, 0, canvas_size, canvas_size);
}

function draw_square(x, y, color) {
    fill(color);
    rect(x * square_length, y * square_length, square_length, square_length);
}

function draw_queen(x, y, queen) {
    image(queen, x * square_length, y * square_length, square_length, square_length);
}

function mousePressed() {
    for (var i = 0; i < board_size; i++) {
        for (var j = 0; j < board_size; j++) {
            var cur_square = board[i][j];
            if (clickInSquare(cur_square)) {
                cur_square.clicked();
            }
        }
    }
}

function clickInSquare(square) {
    var clickInXRange = square.x_pixel < mouseX && (square.x_pixel + square.length) > mouseX;
    var clickInYRange = square.y_pixel < mouseY && (square.y_pixel + square.length) > mouseY;
    return clickInXRange && clickInYRange;
}

function Square(x, y, fill_shade) {
    this.x = x;
    this.y = y;
    this.length = square_length; 
    //either dark or light
    this.fill_shade = fill_shade;
    this.fill_color = fill_shade === "dark" ? board_color_dark : board_color_light;
    this.queen;

    //for testing
    if (x == 1 && y == 0) {
        this.queen = new Queen("white");
    }

    if (x == 1 && y == 1) {
        this.queen = new Queen("black");
    }

    this.x_pixel = this.x * this.length;
    this.y_pixel = this.y * this.length;

    this.clicked = function() {
        //process any changes to the board
        if (selected_square) {
            if (!this.is_selected() && selected_square.has_queen()) {
                this.queen = selected_square.queen;
                selected_square.queen = null;
                selected_square = null;
            } else { //other empty square is selected
                selected_square = this;
            }
        } else { //no square is selected
            selected_square = this;
        }        
    }

    this.has_queen = function() {
        return this.queen != null;
    }

    this.get_queen_image = function() {
        if (!this.has_queen()) {
            return -1;
        }

        if (this.queen.color === "white") {
            return this.fill_shade === "dark" ? white_queen_on_dark : white_queen_on_light; 
        } else {
            return this.fill_shade === "dark" ? black_queen_on_dark : black_queen_on_light; 
        }
    }

    this.is_selected = function() {
        return selected_square === this;
    }
}

function Queen(color) {
    this.color = color; //either white or black
}

// function draw() {
//     frame_count = frame_count + 1;
//     print(frame_count);
//     if (frame_count % rate == 0) {
//       draw_it();  
//     } else {  
//     }
// }

// function draw_it() {
//     if (mouseIsPressed) {
//         fill(0);
//     } else {
//         fill(255);
//     }
//     ellipse(mouseX, mouseY, 40, 40);
// }