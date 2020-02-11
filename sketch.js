var cells, offset, margin, cellSize; // variables for the lines
var movers = []; // variable for the animation
var graphics; // variable of the graphics
var url = "https://coolors.co/ffdb27-3127ff-ef1b1b-2dc943-833df2"; // url of the colors
var palette; // variable of the palette

var logo; // variable of the logo

var button; // variable of the button

function preload() {
  logo = loadImage("./assets/logo.png"); // load the image of the logo
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  // create a button
  button = createButton("START");
  button.position(windowWidth / 3.6, windowHeight / 2 + 400);
  button.mousePressed(tutorialMap); // go to the tutorial

  palette = createPalette(url);

  // create the graphics with their properties
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  graphics.noStroke();
  graphics.fill(0, 0, 100, 1);
  for (var i = 0; i < width * height * 10 / 100; i++) {
    var x = random(width);
    var y = random(height);
    var w = random(2);
    var h = random(2);
    graphics.ellipse(x, y, w, h);
  }

  cells = 8; // number of cells for the animation

  // arrangement of the cells on the canvas
  offset = windowHeight;
  margin = offset / 10;
  cellSize = 100;

  background(0, 0, 89);

  // random animation of the lines on the canvas
  for (var a = 0; a < cells; a++) {
    for (var b = 0; b < cells; b++) {
      var x = offset + a * (cellSize + margin);
      var y = offset + b * (cellSize + margin);
      var m = new Move(x + random(cellSize), y + random(cellSize));
      movers.push(m);
    }
  }

  image(graphics, 0, 0);
}

function draw() {

  background(0, 0, 89, 5);

  // display and loop of the animation of the lines
  for (var m of movers) {
    m.update();
    m.display();
  }

  // position and dimension of the logo on the canvas
  imageMode(CENTER);
  image(logo, windowWidth / 2, windowHeight / 2, logo.width / 1.3, logo.height / 1.3);

}

// class for the animation of the lines on the canvas
class Move {
  constructor(x, y) {
    this.prevPosition = []; // previous position of the lines
    this.maxLength = 5; // max length of the lines
    this.strokec = random(palette); // color of the stroke of the lines
    this.fillc = random(palette); // color of the fill of the lines
    this.position = createVector(x, y); // create a vector with x and y components
    this.prevPos = this.position.copy(); // copy the previous position
    this.dir = int(random(8)) * 360 / 8; // direction of the lines
    this.r = 3; // velocity
  }

  // update function for the loop animation of the lines
  update() {
    if (random(100) < 3) {
      var newDir = this.dir;
      while (newDir == this.dir) {
        newDir = int(random(8)) * 360 / 8;
      }
      this.dir = newDir;
    }
    this.position.add(createVector(cos(this.dir), sin(this.dir)).mult(this.r));

    if (this.position.x < 0) {
      this.position.x += width;
      this.prevPosition = [];
    } else if (this.position.x > width) {
      this.position.x -= width;
      this.prevPosition = [];
    }

    if (this.position.y < 0) {
      this.position.y += height;
      this.prevPosition = [];
    } else if (this.position.y > height) {
      this.position.y -= height;
      this.prevPosition = [];
    }

    this.prevPosition.push(this.position.copy());

    if (this.prevPosition.length > this.maxLength) {
      this.prevPosition.shift();
    }
  }

  // display function of the lines
  display() {
    stroke(this.strokec);
    fill(this.fillc);
    beginShape();
    var pp;
    for (var p of this.prevPosition) {
      if (typeof(pp) != 'undefined') {
        var d = p5.Vector.dist(p, pp);
        if (d > this.r * 2) {
          endShape();
          beginShape();
        }
      }
      vertex(p.x, p.y);
      pp = p.copy();
    }
    endShape();

    this.prevPos = this.position.copy();
  }
}

// function for the palette of colors used for the animation
function createPalette(_url) {
  var slash_index = _url.lastIndexOf('/');
  var palette_str = _url.slice(slash_index + 1);
  var arr = palette_str.split('-');

  for (var i = 0; i < arr.length; i++) {
    var red = unhex(arr[i].substr(0, 2));
    var green = unhex(arr[i].substr(2, 2));
    var blue = unhex(arr[i].substr(4, 2));
    colorMode(RGB, 255, 255, 255);
    var c = color(red, green, blue);
    var h = hue(c);
    var s = saturation(c);
    var b = brightness(c);
    var t = 100 * 3 / 4;
    colorMode(HSB, 360, 100, 100, 100);
    c = color(h, s, b, t);
    arr[i] = c;
  }
  return arr;
}
// 
// function touchEnded(event) {
//   DeviceOrientationEvent.requestPermission()
// }

// function to move to the next page (tutorial)
function tutorialMap(){
  window.open("index2.html", "_self");
}
