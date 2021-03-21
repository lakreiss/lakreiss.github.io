var HEIGHT = 50, WIDTH = 25;
var STARTING_X = 100, STARTING_Y = 0;
var IMAGE_SRC = "../img/stick_figure.png", ID = "player_element";
var JUMP_SPEED = 15, GRAVITY = 1;
var Player = /** @class */ (function () {
    function Player() {
        this.image = IMAGE_SRC;
        this.position = new Position();
        this.id = ID;
        this.height = HEIGHT + "px";
        this.width = WIDTH + "px";
        this.is_falling = false;
        this.is_rising = false;
    }
    Player.prototype.create_new_player = function () {
        this.position.x = STARTING_X + "px";
        this.position.y = STARTING_Y + "px";
        this.position.v_x = 0;
        this.position.v_y = 0;
    };
    Player.prototype.move_left = function (num_pixels) {
        this.position.v_x = -num_pixels;
    };
    Player.prototype.move_right = function (num_pixels) {
        this.position.v_x = num_pixels;
    };
    Player.prototype.jump = function () {
        console.log("tried to jump");
        // this.position.y = this.get_number_from_pixels(this.position.y) - 10 + "px";
        this.position.v_y = JUMP_SPEED;
        this.is_falling = false;
        this.is_rising = true;
    };
    // move_down(num_pixels) {
    //   this.position.v_x = num_pixels;
    // }
    Player.prototype.stop_x = function () {
        this.position.v_x = 0;
    };
    Player.prototype.update_position = function () {
        if (this.is_falling || this.is_rising) {
            this.position.v_y -= GRAVITY;
            if (this.position.v_y <= 0) {
                this.is_falling = true;
                this.is_rising = false;
            }
            else {
                this.is_rising = true;
                this.is_falling = false;
            }
        }
        else {
            this.position.v_y = 0;
        }
        this.position.x = this.get_number_from_pixels(this.position.x) + this.position.v_x + "px";
        this.position.y = this.get_number_from_pixels(this.position.y) - this.position.v_y + "px";
    };
    Player.prototype.set_y_position_to_top_of = function (element) {
        this.position.y = element.getBoundingClientRect().top - HEIGHT + 1 + "px";
    };
    Player.prototype.get_number_from_pixels = function (pixels) {
        return parseInt(pixels.substring(0, pixels.length - 2));
    };
    return Player;
}());
export { Player };
var Position = /** @class */ (function () {
    function Position() {
    }
    return Position;
}());
export { Position };
export var Direction;
(function (Direction) {
    Direction[Direction["LEFT"] = 0] = "LEFT";
    Direction[Direction["RIGHT"] = 1] = "RIGHT";
    Direction[Direction["UP"] = 2] = "UP";
    Direction[Direction["DOWN"] = 3] = "DOWN";
})(Direction || (Direction = {}));
//# sourceMappingURL=adventure_player.js.map