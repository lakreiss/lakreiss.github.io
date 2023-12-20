// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Snowfall
// Edited Video: https://youtu.be/cl-mHFCGzYk

const numberOfSnowflakes = 200;
let snow = [];
let gravity = 0.9;

let zOff = 0;


const spritesheetImageSize = 32;
let spritesheet;
let faces;
let max_face;
let textures = [];

function preload() {
  spritesheet = loadImage('../img/snowflakes32.png');
  faces = [loadImage('../img/faces/glenn.png'), loadImage('../img/faces/myron.png'), loadImage('../img/faces/liam.png')];
  max_face = loadImage('../img/faces/max.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gravity = createVector(0, gravity);

  // Add all the snow images to the textures list
  for (let x = 0; x < spritesheet.width; x += spritesheetImageSize) {
    for (let y = 0; y < spritesheet.height; y += spritesheetImageSize) {
      let img = spritesheet.get(x, y, spritesheetImageSize, spritesheetImageSize);
      textures.push(img);
    }
  }
  // Add our faces as potential textures
  faces.forEach(faceImage => {
    textures.push(faceImage);
  });

  for (let i = 0; i < numberOfSnowflakes; i++) {
    snow.push(new Snowflake(textures, faces, max_face));
  }
}

function draw() {
  background(0);

  zOff += gravity;

  for (flake of snow) {
    let xOff = flake.pos.x / width;
    let yOff = flake.pos.y / height;
    let wAngle = noise(xOff, yOff, zOff) * TWO_PI;
    let wind = p5.Vector.fromAngle(wAngle);
    wind.mult(0.1);

    flake.applyForce(gravity);
    flake.applyForce(wind);
    flake.update();
    flake.render();
  }
}

function meetNewHousemate() {
  for (flake of snow) {
    flake.becomeMax();
  }
}