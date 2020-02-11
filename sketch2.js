var logo; // variable of the logo

var p1; // variable of the paragraph
var button; // variable of the button

var colorList = ["#ffdb27", "3127ff", "ef1b1b", "2dc943", "833df2"]; // url of the colors

function preload() {
  logo = loadImage("./assets/logo2.png"); // load the image of the logo
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // create a paragraph
  p1 = createP("Paint the map with MAPSTRACT! It is simple: pick a colour and walk around the city to leave a colourful trail along with other people around the world.");
  p1.position(170, 180);

  // create a button
  button = createButton("PLAY");
  button.position(windowWidth / 3.6, windowHeight / 2 + 400);
  button.mousePressed(playMap);

}

function draw() {

  background("#e4e4e4");

  // position and dimension of the logo on the canvas
  imageMode(CORNER);
  image(logo, 20, 20, logo.width / 4, logo.height / 4);

  // create a box
  rectMode(CENTER);
  angleMode(DEGREES);
  stroke(lerpColor(color('#833df2'), color('#ef1b1b'), sin(frameCount) * 2));
  strokeWeight("2");
  noFill();
  rect(windowWidth / 2, 620, 750, 850, 50);

}

// function touchEnded(event) {
//   DeviceOrientationEvent.requestPermission()
// }

function playMap(){
  window.open("index3.html", "_self");
}

function touchStarted(){
  if (mouseX <= 150 && mouseY <= 150) {
  window.open("index.html", "_self");
 }
}
