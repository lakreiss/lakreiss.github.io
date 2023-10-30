// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Snowfall
// Edited Video: https://youtu.be/cl-mHFCGzYk

let snow = [];
let gravity;

let zOff = 0;

let spritesheet;
let faces;
let textures = [];

function preload() {
  spritesheet = loadImage('../img/snowflakes32.png');
  faces = [loadImage('../img/faces/glenn.png'), loadImage('../img/faces/myron.png'), loadImage('../img/faces/liam.png')];
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gravity = createVector(0, 0.1);

  // Add all the snow images to the textures list
  for (let x = 0; x < spritesheet.width; x += 32) {
    for (let y = 0; y < spritesheet.height; y += 32) {
      let img = spritesheet.get(x, y, 32, 32);
      textures.push(img);
    }
  }
  // Add our faces as potential textures
  faces.forEach(faceImage => {
    textures.push(faceImage);
  });

  for (let i = 0; i < 400; i++) {
    let x = random(width);
    let y = random(height);
    let design = random(textures);
    snow.push(new Snowflake(x, y, design));
  }
}

function draw() {
  background(0);

  zOff += 0.1;

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