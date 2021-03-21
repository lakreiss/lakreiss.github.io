const HEIGHT = 50, WIDTH = 25;
const STARTING_X = 100, STARTING_Y = 0;
// const IMAGE_SRC = "../img/stick_figure.png", ID = "player_element";
const IMAGE_PREFIX = "../img/", IMAGE_POSTFIX = ".png";
const IMAGE_SRC = build_image("idle"), ID = "player_element";
const JUMP_SPEED = 15, GRAVITY = 1;
const NUM_RUNNING_FRAMES = 8, SLOW_FACTOR = 4;

export class Player {
  image:string = IMAGE_SRC;
  image_index = 0;
  position: Position = new Position();
  id:string = ID;
  height:string = HEIGHT + "px";
  width:string = WIDTH + "px";
  is_falling:boolean = false;
  is_rising:boolean = false;

  create_new_player() {
    this.position.x = STARTING_X + "px";
    this.position.y = STARTING_Y + "px";
    this.position.v_x = 0;
    this.position.v_y = 0;
  }

  move_left(num_pixels) {
    this.position.v_x = -num_pixels;
  }

  move_right(num_pixels) {
    this.position.v_x = num_pixels;
  }

  increment_image_index() {
    this.image_index = (this.image_index % (NUM_RUNNING_FRAMES * SLOW_FACTOR)) + 1;
  }

  jump() {
    this.position.v_y = JUMP_SPEED;
    this.is_falling = false;
    this.is_rising = true;
  }

  // move_down(num_pixels) {
  //   this.position.v_x = num_pixels;
  // }

  stop_x() {
    this.position.v_x = 0;
  }

  update_position() {
    if (this.is_falling || this.is_rising) {
      this.position.v_y -= GRAVITY;
      if (this.position.v_y <= 0) {
        this.is_falling = true;
        this.is_rising = false;
      } else {
        this.is_rising = true;
        this.is_falling = false;
      }
    } else {
      this.position.v_y = 0;
    }
    this.position.x = this.get_number_from_pixels(this.position.x) + this.position.v_x + "px";
    this.set_new_image_based_off_velocity(this.position.v_x);
    this.position.y = this.get_number_from_pixels(this.position.y) - this.position.v_y + "px";
  }

  set_y_position_to_top_of(element) {
    this.position.y = element.getBoundingClientRect().top - HEIGHT + 1 + "px";
  }

  set_new_image_based_off_velocity(v_x: number) {
    if (v_x !== 0) {
      this.increment_image_index();
      if (v_x < 0) {
        this.image = build_image("run_right_" + Math.ceil(this.image_index / SLOW_FACTOR));
      } else {
        this.image = build_image("run_right_" + Math.ceil(this.image_index / SLOW_FACTOR));
      }
    } else {
      this.image_index = 0;
      this.image = build_image("idle");
    }
  }

  get_number_from_pixels(pixels: string): number {
    return parseInt(pixels.substring(0, pixels.length - 2));
  }
}

export class Position {
  x: string;
  y: string;
  v_x: number;
  v_y: number;
}

export enum Direction {
  LEFT, RIGHT, UP, DOWN,
}

function build_image(input_string): string {
  return IMAGE_PREFIX + input_string + IMAGE_POSTFIX;
}