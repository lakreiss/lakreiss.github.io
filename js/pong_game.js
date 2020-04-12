window.addEventListener('keydown', function(e) { key_press(e); });
window.addEventListener('keyup', function(e) { key_up(e); });

function key_press(e) {
  // alert(e.keyCode);
  switch(e.keyCode) {
    case 38: //up key
      move_paddle("up");
      break;
    case 40: //down key
      move_paddle("down");
      break;
    default:
      // do nothing
  }
}

function key_up(e) {
  // alert(e.keyCode);
  switch(e.keyCode) {
    case 38: //up key
      stop_paddle();
      break;
    case 40: //down key
      stop_paddle();
      break;
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
  startBall();
  startPaddles();
  // startScore(); TODO implement
  myGameArea.start();
}

var myGameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
      this.canvas.width = 500;
      this.canvas.height = 300;
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
  var ball_x = Math.floor(myGameArea.canvas.width / 2);
  var ball_y = Math.floor(myGameArea.canvas.height / 2);
  var ball_speed = BALL_MAX_SPEED / 4;
  //TODO make angle always within certain bounds
  var ball_angle = Math.floor(Math.random()*360) * Math.PI / 180;
  var ball_velocity_x = Math.cos(ball_angle) * ball_speed;
  var ball_velocity_y = Math.sin(ball_angle) * ball_speed;

  ball = {x:ball_x, y:ball_y, nextx:ball_x, nexty:ball_y, radius:BALL_SIZE,
      speed:ball_speed, angle:ball_angle, velocity_x:ball_velocity_x, velocity_y:ball_velocity_y};
}

function startPaddles() {
  var p1_x = Math.floor(myGameArea.canvas.width / 10);
  var p1_y = Math.floor(myGameArea.canvas.height / 2);
  var p1_velocity = 0;

  var p1 = {x:p1_x, y:p1_y, nextx:p1_x, nexty:p1_y,
    height:PADDLE_HEIGHT, width:PADDLE_WIDTH, velocity:p1_velocity};

  var p2_x = Math.floor(myGameArea.canvas.width / 10 * 9);
  var p2_y = Math.floor(myGameArea.canvas.height / 2);
  var p2_velocity = 0;

  var p2 = {x:p2_x, y:p2_y, nextx:p2_x, nexty:p2_y,
    height:PADDLE_HEIGHT, width:PADDLE_WIDTH, velocity:p2_velocity};

  paddles[0] = p1;
  paddles[1] = p2;
}

function  drawScreen () {

  myGameArea.context.fillStyle = '#EEEEEE';
  myGameArea.context.fillRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
  //Box
  myGameArea.context.strokeStyle = '#000000';
  myGameArea.context.strokeRect(1,  1, myGameArea.canvas.width-2, myGameArea.canvas.height-2);
  // console.log("got here");
  update();
  testWalls();
  // testPaddles()
  render();

}

function update() {

  //update ball
  ball.nextx = (ball.x += ball.velocity_x);
  ball.nexty = (ball.y += ball.velocity_y);

  //update paddles
  for (var i = 0; i < paddles.length; i++) {
    cur_paddle = paddles[i];
    cur_paddle.nexty = (cur_paddle.y += cur_paddle.velocity);
  }
}

function testWalls() {
  if (ball.nextx+ball.radius > myGameArea.canvas.width) {
    ball.velocity_x = ball.velocity_x*(-1);
    ball.nextx = myGameArea.canvas.width - ball.radius;

  } else if (ball.nextx-ball.radius < 0 ) {
    ball.velocity_x = ball.velocity_x*(-1);
    ball.nextx =ball.radius;

  } else if (ball.nexty+ball.radius > myGameArea.canvas.height ) {
    ball.velocity_y = ball.velocity_y*(-1);
    ball.nexty = myGameArea.canvas.height - ball.radius;

  } else if(ball.nexty-ball.radius < 0) {
    ball.velocity_y = ball.velocity_y*(-1);
    ball.nexty = ball.radius;
  }

  for (var i = 0; i < paddles.length; i++) {
    cur_paddle = paddles[i];
    if (cur_paddle.nexty + (cur_paddle.height / 2) > myGameArea.canvas.height) {
      cur_paddle.nexty = myGameArea.canvas.height - (cur_paddle.height / 2);
    } else if (cur_paddle.nexty - (cur_paddle.height / 2) < 0) {
      cur_paddle.nexty = cur_paddle.height / 2;
    }
  }
}

function render() {

 // render ball
  myGameArea.context.fillStyle = "#000000";
  ball.x = ball.nextx;
  ball.y = ball.nexty;

  myGameArea.context.beginPath();
  myGameArea.context.arc(ball.x,ball.y,ball.radius,0,Math.PI*2,true);
  myGameArea.context.closePath();
  myGameArea.context.fill();


  //render paddles
  for (var i = 0; i < paddles.length; i++) {
    cur_paddle = paddles[i];
    cur_paddle.x = cur_paddle.nextx;
    cur_paddle.y = cur_paddle.nexty;
    myGameArea.context.fillRect(cur_paddle.x - (cur_paddle.width / 2), cur_paddle.y - (cur_paddle.height / 2), cur_paddle.width, cur_paddle.height);
  }
}

var ball;
var BALL_SIZE = 8;
var BALL_MAX_SPEED = 20;

var paddles = new Array(); //paddles[0] is the left paddle (player), paddles[1] is the right paddle (cpu) (for now)
var PADDLE_HEIGHT = 60;
var PADDLE_WIDTH = 16;
var PADDLE_SPEED = 5;
var cur_paddle;

function move_paddle(direction) {
  cur_paddle = paddles[0];
  if (direction == "up") {
    cur_paddle.velocity = -PADDLE_SPEED;
  } else {
    cur_paddle.velocity= PADDLE_SPEED;
  }
}

function stop_paddle() {
  cur_paddle = paddles[0];
  cur_paddle.velocity = 0;
}
