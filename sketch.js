let myMap;

// var myTearDropDx;
// var amountOfTearDropDx = 190; //max
// var allMyDropDx = []; //array

let canvas;
let posx, posy;
var position, radius;
var value = 0;
var milano;
var listpick = 4;
var redx, redy, blux, bluy, yelx, yely, radc;
var myLat, myLon;
// cambiare coordinate per città, sono sotto
var swuno = -2.152029 // BIRMINGHAM
var swdue = 52.352969
var neuno = -1.597220
var nedue = 52.581785

const watchOptions = {
  enableHighAccuracy: true,
  maximumAge: 0
};

var colorList = ['red', 'blue', 'yellow', 'white', 'black']
const mappa = new Mappa('MapboxGL', "pk.eyJ1IjoiYW5kcmVhYmVuZWRldHRpIiwiYSI6ImNqNWh2eGh3ejFqOG8zM3BrZjRucGZkOGEifQ.SmdBpUoSe3s0tm-OTDFY9Q")
var bounds = [
  [swuno, swdue], // SW coordinates
  [neuno, nedue] // NE coordinates
];

// var swuno = 1.019649 // CANTERBURY
// var swdue = 51.249429
// var neuno = 1.151313
// var nedue = 51.309454
//
// var swuno = 9.059298 // MILANO
// var swdue = 45.385749
// var neuno = 9.304870
// var nedue = 45.541406
//
// var swuno = -2.152029 // BIRMINGHAM
// var swdue = 52.352969
// var neuno = -1.597220
// var nedue = 52.581785

// CANTERBURY
// [1.019649,51.249429], // SW coordinates
// [1.151313,51.309454] // NE coordinates

// MILANO
// [9.059298,45.385749], // SW coordinates
// [9.304870,45.541406] // NE coordinates

// BIRMINGHAM
// [-2.152029, 52.352969], // SW coordinates
// [-1.597220, 52.581785] // NE coordinates

const options = {
  // lat: 45.4689727,
  // lng: 9.1895752,
  zoom: 17,
  style: "mapbox://styles/mapbox/dark-v8",
  pitch: 10,
  maxBounds: bounds
}


function preload() {
  milano = loadImage("./mappaMilano.png")
  position = watchPosition(positionChanged);
}

function positionChanged(position){
  myLat = position.latitude;
 myLon = position.longitude;
}

function setup() {
  // 
  // for (var i = 0; i < amountOfTearDrop; i++) { //creating a for cycle with interative variable that goes from 0 to the aount of balls
  //
  //   var myTearDrop = new Drop(random(windowWidth / 4 + 185, windowWidth / 4 + 160), random(0.5, 1) * windowHeight - 75, random(12, 28), "LightSkyBlue", noStroke());
  //
  //   allMyDrop.push(myTearDrop);
  // }

  canvas = createCanvas(windowWidth, windowHeight)
  // background(milano)
  var canvas2 = createCanvas(windowWidth, windowHeight)

 options.lat = myLat;
 options.lng = myLon;
  myMap = mappa.tileMap(options);
  canvas2.overlay(myMap)
  myMap.overlay(canvas)


  redx = windowWidth * 1 / 4
  redy = windowHeight * 9.9 / 10
  blux = windowWidth * 2 / 4
  bluy = redy
  yelx = windowWidth * 3 / 4
  yely = redy
}

// function deviceMoved() {
//   value = value - 1;
//   if (value > -7) {
//     value = -7
//   }
// }

function draw() {
  // clear()

  fill('orange')
  radc = windowWidth / 20
  rectMode(CENTER)



  noStroke()
  // posx = map(position.latitude,59.58,37.41,0,windowWidth)
  // posy = map(position.longitude,-10,18.9,0, windowHeight)
  var point = myMap.latLngToPixel(myLat, myLon)

  fill(colorList[listpick])
  radius = 15;
  circle(point.x, point.y, radius)


  fill('red')
  rect(windowWidth-(radc),windowHeight/6,radc*2,windowHeight/3)
  fill('yellow')
  rect(windowWidth-(radc),windowHeight*3/6,radc*2,windowHeight/3)
  fill('blue')
  rect(windowWidth-(radc),windowHeight*5/6,radc*2,windowHeight/3)

}

function mouseClicked() {
  if (mouseY < windowHeight / 3 && (mouseX > (windowWidth-(radc*2)))) {
    listpick = 0;
    console.log('done')
  } else
  if (mouseY < windowHeight *2 / 3 && (mouseX > (windowWidth-(radc*2)))) {
    listpick = 2;

  } else
  if (windowWidth-(radc*2) && (mouseX > (windowWidth-(radc*2)))) {
    listpick = 1;

  } else {

  }
}


function touchEnded(event) {
  DeviceOrientationEvent.requestPermission()
}
