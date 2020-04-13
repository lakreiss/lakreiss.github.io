window.addEventListener('keydown', function(e) { key_press(e); });
window.addEventListener('keyup', function(e) { key_up(e); });

var GAME_WIDTH = 500, GAME_HEIGHT = 300;
// var GAME_WIDTH = window.innerWidth * (1/2), GAME_HEIGHT = window.innerHeight * (1/2);
var BALL_SIZE = 8, BALL_MAX_SPEED = 40, BALL_START_SPEED = 5, SPEED_MULTIPLIER = 1.05;
// BALL_START_SPEED = 20; //FOR DEBUGGING
var PADDLE_HEIGHT = 60, PADDLE_WIDTH = 16, PLAYER_PADDLE_SPEED = 5, CPU_PADDLE_SPEED;
var BALL_COLOR = "#000000", PADDLE_COLOR = "#000000", TEXT_COLOR = "#000000";
var TEXT_FONT_SIZE = 30;
var user_1 = 0, user_2 = 1;
var score = new Array(0, 0);
var game_is_over = false;

var ball;
var paddles = new Array(); //paddles[0] is the left paddle (player), paddles[1] is the right paddle (cpu) (for now)
var cur_paddle, cur_paddle_speed;
var score_text;

var p2_is_computer = false;
var curved_paddles = false; //TODO: fix the curved bouncing and add this as a game option
var WINNING_SCORE = 7;

function key_press(e) {
  // alert(e.keyCode);
  switch(e.keyCode) {
    case 38: //up key
      if (!p2_is_computer) {
        move_paddle(user_2, "up");
      } else {
        move_paddle(user_1, "up");
      }
      break;
    case 40: //down key
      if (!p2_is_computer) {
        move_paddle(user_2, "down");
      } else {
        move_paddle(user_1, "down");
      }
      break;
    case 87: //w key
      move_paddle(user_1, "up");
      break;
    case 83: //s key
      move_paddle(user_1, "down");
      break;
    default:
      // do nothing
  }
}

function key_up(e) {
  // alert(e.keyCode);
  switch(e.keyCode) {
    case 38: //up key
      if (!p2_is_computer) {
        stop_paddle(user_2);
      } else {
        stop_paddle(user_1);
      }
      break;
    case 40: //down key
      if (!p2_is_computer) {
        stop_paddle(user_2);
      } else {
        stop_paddle(user_1);
      }
      break;
    case 87: //w key
      stop_paddle(user_1);
      break;
    case 83: //s key
      stop_paddle(user_1);
    default:
      // do nothing
  }
}

var has_started = false;
function startGame() {
  if (has_started) {
    return;
  }
  has_started = true;

  startNewGame();
  myGameArea.start();
}

function startNewGame() {
  //first analyze the game options to see how the game should be set up
  p2_is_computer = document.getElementById("vs_CPU").checked;
  if (p2_is_computer) {
    difficulty = get_difficulty();
    set_cpu_paddle_speed(difficulty);
  }

  //then build everything and start the game
  startBall();
  startPaddles();
  startScore();
  game_is_over = false;
  document.getElementById("play_again_button").setAttribute("hidden", true);
}

var myGameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
      this.canvas.width = GAME_WIDTH;
      this.canvas.height = GAME_HEIGHT;
      this.context = this.canvas.getContext("2d");
      document.getElementById("pong_game").appendChild(this.canvas);
      this.frameNo = 0;
      this.interval = setInterval(drawScreen, 33);
      },
  clear : function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

function startBall() {
  var ball_x = Math.floor(GAME_WIDTH / 2);
  var ball_y = Math.floor(GAME_HEIGHT / 2);
  var ball_speed = BALL_START_SPEED;

  var ball_degrees = Math.floor(Math.random()*180);
  if (ball_degrees > 45 && ball_degrees < 135) {
    if (ball_degrees > 90) {
      ball_degrees += 90;
    } else {
      ball_degrees -= 90;
    }
  }
  var ball_angle = ball_degrees * Math.PI / 180;

  var ball_velocity_x = Math.cos(ball_angle) * ball_speed;
  var ball_velocity_y = Math.sin(ball_angle) * ball_speed;

  ball = {x:ball_x, y:ball_y, next_x:ball_x, next_y:ball_y, radius:BALL_SIZE,
      speed:ball_speed, angle:ball_angle, velocity_x:ball_velocity_x, velocity_y:ball_velocity_y};
}

function startPaddles() {
  var p1_x = Math.floor(GAME_WIDTH / 10);
  var p1_y = Math.floor(GAME_HEIGHT / 2);
  var p1_velocity = 0;

  var p1 = {x:p1_x, y:p1_y, next_x:p1_x, next_y:p1_y,
    height:PADDLE_HEIGHT, width:PADDLE_WIDTH, velocity:p1_velocity};

  var p2_x = Math.floor(GAME_WIDTH / 10 * 9);
  var p2_y = Math.floor(GAME_HEIGHT / 2);
  var p2_velocity = 0;

  var p2 = {x:p2_x, y:p2_y, next_x:p2_x, next_y:p2_y,
    height:PADDLE_HEIGHT, width:PADDLE_WIDTH, velocity:p2_velocity};

  paddles[0] = p1;
  paddles[1] = p2;
}

function startScore() {
  var text_x = Math.floor(GAME_WIDTH / 2);
  var text_y = Math.floor(GAME_HEIGHT / 8);
  var text_pixels = TEXT_FONT_SIZE + "px";
  var text_font = "Consolas";
  var text_color = TEXT_COLOR;
  for (var i = 0; i < score.length; i++) {
    score[i] = 0;
  }
  var text_contents = get_score_as_text();

  score_text = {x:text_x, y:text_y, pixel_size:text_pixels, font:text_font, color:text_color, contents:text_contents};
}

function  drawScreen () {

  myGameArea.context.setLineDash([]);
  myGameArea.context.fillStyle = '#EEEEEE';
  myGameArea.context.fillRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
  //Box
  myGameArea.context.strokeStyle = '#000000';
  myGameArea.context.strokeRect(1,  1, myGameArea.canvas.width-2, myGameArea.canvas.height-2);


  // Dashed line
  myGameArea.context.beginPath();
  myGameArea.context.moveTo(myGameArea.canvas.width / 2, 0);
  myGameArea.context.setLineDash([5, 15]);

  myGameArea.context.lineTo(myGameArea.canvas.width / 2, myGameArea.canvas.height);
  myGameArea.context.stroke();

  if (!game_is_over) {
    if (p2_is_computer) {
      computer_input();
    }

    update();
    testWalls();
    testPaddleCollision()
  } else {
    update(); //this allows the 7 to show up, but also the user can move the paddles off the screen. i don't really care if they do that though so i'll leave it for now
  }
  render();
}

function update() {

  //update ball
  update_ball_velocity();
  ball.next_x = (ball.x += ball.velocity_x);
  ball.next_y = (ball.y += ball.velocity_y);

  //update paddles
  for (var i = 0; i < paddles.length; i++) {
    cur_paddle = paddles[i];
    cur_paddle.next_y = (cur_paddle.y += cur_paddle.velocity);
  }

  //update score_text
  score_text.contents = get_score_as_text();
}

function testWalls() {
  if (ball.next_x+ball.radius > myGameArea.canvas.width) {
    //ball hit the right side of the canvas
    ball.next_x = myGameArea.canvas.width - ball.radius;
    add_point(user_1);
  } else if (ball.next_x-ball.radius < 0 ) {
    //ball hit the left side of the canvas
    ball.next_x = ball.radius;
    add_point(user_2);
  } else if (ball.next_y+ball.radius > myGameArea.canvas.height ) {
    //ball hit the bottom of the canvas
    ball.angle *= -1;
    ball.next_y = myGameArea.canvas.height - ball.radius;

  } else if(ball.next_y-ball.radius < 0) {
    //ball hit the top of the canvas
    ball.angle *= -1;
    ball.next_y = ball.radius;
  }

  for (var i = 0; i < paddles.length; i++) {
    cur_paddle = paddles[i];
    if (cur_paddle.next_y + (cur_paddle.height / 2) > myGameArea.canvas.height) {
      cur_paddle.next_y = myGameArea.canvas.height - (cur_paddle.height / 2);
    } else if (cur_paddle.next_y - (cur_paddle.height / 2) < 0) {
      cur_paddle.next_y = cur_paddle.height / 2;
    }
  }
}

function testPaddleCollision() {

  //checking the first paddle
  cur_paddle = paddles[user_1];
  if (ball.next_x-ball.radius < paddle_right(cur_paddle) && ball.next_x+ball.radius > paddle_left(cur_paddle)) {
    if (ball.next_y-ball.radius < paddle_bottom(cur_paddle) && ball.next_y+ball.radius > paddle_top(cur_paddle)) {
      if (curved_paddles) {
        ball.angle = Math.PI - ball.angle; //TODO FIX THIS

      } else {
        ball.angle = Math.PI - ball.angle;
      }
      ball.next_x = paddle_right(cur_paddle) + ball.radius;
      increase_ball_speed();
    }
  }

  //checking the second paddle
  cur_paddle = paddles[user_2];
  if (ball.next_x+ball.radius > paddle_left(cur_paddle) && ball.next_x-ball.radius < paddle_right(cur_paddle)) {
    if (ball.next_y-ball.radius < paddle_bottom(cur_paddle) && ball.next_y+ball.radius > paddle_top(cur_paddle)) {
      if (curved_paddles) {
        ball.angle = Math.PI - ball.angle; //TODO FIX THIS

      } else {
        ball.angle = Math.PI - ball.angle;
      }
      ball.next_x = paddle_left(cur_paddle) - ball.radius;
      increase_ball_speed();
    }
  }
}

function render() {

 // render ball
  myGameArea.context.fillStyle = BALL_COLOR;
  ball.x = ball.next_x;
  ball.y = ball.next_y;

  myGameArea.context.beginPath();
  myGameArea.context.arc(ball.x,ball.y,ball.radius,0,Math.PI*2,true);
  myGameArea.context.closePath();
  myGameArea.context.fill();


  //render paddles
  myGameArea.context.fillStyle = PADDLE_COLOR;
  for (var i = 0; i < paddles.length; i++) {
    cur_paddle = paddles[i];
    cur_paddle.x = cur_paddle.next_x;
    cur_paddle.y = cur_paddle.next_y;
    if (curved_paddles) {
      myGameArea.context.setLineDash([]);
      myGameArea.context.beginPath();
      if (i == user_1) {
        myGameArea.context.moveTo(paddle_left(cur_paddle), paddle_top(cur_paddle));
        myGameArea.context.bezierCurveTo(paddle_right(cur_paddle), paddle_top(cur_paddle), paddle_right(cur_paddle), paddle_bottom(cur_paddle), paddle_left(cur_paddle), paddle_bottom(cur_paddle));
      } else {
        myGameArea.context.moveTo(paddle_right(cur_paddle), paddle_top(cur_paddle));
        myGameArea.context.bezierCurveTo(paddle_left(cur_paddle), paddle_top(cur_paddle), paddle_left(cur_paddle), paddle_bottom(cur_paddle), paddle_right(cur_paddle), paddle_bottom(cur_paddle));
      }
      myGameArea.context.stroke();
    } else {
      myGameArea.context.fillRect(paddle_left(cur_paddle), paddle_top(cur_paddle), cur_paddle.width, cur_paddle.height);
    }
  }

  //render score
  myGameArea.context.font = score_text.pixel_size + " " + score_text.font;
  myGameArea.context.fillStyle = score_text.color;
  myGameArea.context.fillText(score_text.contents, score_text.x - (TEXT_FONT_SIZE), score_text.y);
}

function move_paddle(player, direction) {
  if (game_is_over) {
    cur_paddle.velocity = 0;
    return;
  }
  cur_paddle = paddles[player];
  cur_paddle_speed = (p2_is_computer && player == user_2) ? CPU_PADDLE_SPEED : PLAYER_PADDLE_SPEED;

  if (direction == "up") {
    cur_paddle.velocity = -cur_paddle_speed;
  } else {
    cur_paddle.velocity= cur_paddle_speed;
  }
}

function stop_paddle(player) {
  cur_paddle = paddles[player];
  cur_paddle.velocity = 0;
}

function computer_input() { //always player 2
  cur_paddle = paddles[user_2];

  if (cur_paddle.y + (cur_paddle.height / 4) < ball.y) {
    move_paddle(user_2, "down");
  } else if (cur_paddle.y - (cur_paddle.height / 4) > ball.y) {
    move_paddle(user_2, "up");
  } else {
    stop_paddle(user_2);
  }
}

function paddle_top(paddle) {
  return paddle.y - (paddle.height/2);
}

function paddle_bottom(paddle) {
  return paddle.y + (paddle.height/2);
}

function paddle_left(paddle) {
  return paddle.x - (paddle.width/2);
}

function paddle_right(paddle) {
  return paddle.x + (paddle.width/2);
}

function stop_ball() {
  ball.speed = 0;
}

function add_point(player) {
  stop_ball();
  score[player] += 1;
  if (score[player] >= WINNING_SCORE) {
    game_is_over = true;
    stop_paddle(user_1);
    stop_paddle(user_2);
    alert("Player " + (player+1) + " has won!\nClick 'Play Again' to start a new game."); //TODO temporary end, fix so that a new screen pops up or something
    document.getElementById("play_again_button").removeAttribute("hidden");
  } else {
    startBall();
  }
}

function get_score_as_text() {
  return score[0] + "    " + score[1];
}

function increase_ball_speed() {
  ball.speed = ball.speed > BALL_MAX_SPEED ? BALL_MAX_SPEED : ball.speed * SPEED_MULTIPLIER;
}

function hide_difficulty() {
  var all_diff_elements = document.getElementsByClassName("difficulty_section");
  for (var i = 0; i < all_diff_elements.length; i++) {
    all_diff_elements[i].setAttribute("hidden", true);
  }
}

function show_difficulty() {
  var all_diff_elements = document.getElementsByClassName("difficulty_section");
  for (var i = 0; i < all_diff_elements.length; i++) {
    all_diff_elements[i].removeAttribute("hidden");
  }
}

function get_difficulty() {
  if (document.getElementById("dif_easy").checked) {
    return "easy";
  } else if (document.getElementById("dif_medium").checked) {
    return "medium";
  } else if (document.getElementById("dif_hard").checked) {
    return "hard";
  } else if (document.getElementById("dif_impossible").checked) {
    return "impossible";
  } else {
    alert("ERROR: NO DIFFICULTY FOUND");
  }
}

function set_cpu_paddle_speed(difficulty) {
  switch(difficulty) {
    case "easy":
      CPU_PADDLE_SPEED = PLAYER_PADDLE_SPEED / 2;
      break;
    case "medium":
      CPU_PADDLE_SPEED = PLAYER_PADDLE_SPEED;
      break;
    case "hard":
      CPU_PADDLE_SPEED = PLAYER_PADDLE_SPEED * 1.5;
      break;
    case "impossible":
      CPU_PADDLE_SPEED = PLAYER_PADDLE_SPEED * 4;
      break;
    default:
      alert("ERROR: INVALID DIFFICULTY " + difficulty);
  }
}

function update_ball_velocity() {
  ball.velocity_x = Math.cos(ball.angle) * ball.speed;
  ball.velocity_y = Math.sin(ball.angle) * ball.speed;
}
