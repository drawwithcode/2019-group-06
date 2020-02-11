let myMap;
let canvas;
let posx, posy;
var position, radius;
var value = 0;
var listpick = 4;
var redx, redy, blux, bluy, yelx, yely, grex, grey, purx, pury, radc;
var exit, ref;
var database;
var shouldIdraw = false;
var myLat, myLon;
var button;
// city references can be changed just changing the referral points. some examples are further in the code
var swuno = 9.059298 // MILANO
var swdue = 45.385749
var neuno = 9.304870
var nedue = 45.541406
//let's the app to read with high accuracy the location of the user
const watchOptions = {
  enableHighAccuracy: true,
  maximumAge: 0
};
//list of colors used to draw around
var colorList = ['#ef1b1b', '#ffdb27', '#3127ff', '#2dc943', '#000000', '#833df2']

//loading the map
const mappa = new Mappa('MapboxGL', "pk.eyJ1IjoiYW5kcmVhYmVuZWRldHRpIiwiYSI6ImNqNWh2eGh3ejFqOG8zM3BrZjRucGZkOGEifQ.SmdBpUoSe3s0tm-OTDFY9Q")
//bounds of the area used by the app
var bounds = [
  [swuno, swdue], // SW coordinates
  [neuno, nedue] // NE coordinates
];

//different city options

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

//map options
const options = {
  zoom: 17,
  interactive: false,
  style: "mapbox://styles/mapbox/light-v8",
  pitch: 10,
  maxBounds: bounds,
}


function preload() {
  milano = loadImage("./mappaMilano.png")

  //updates location everytime there's a new one
  position = watchPosition(positionChanged);
}

function positionChanged(position) {
  myLat = position.latitude;
  myLon = position.longitude;
  //variable to decide either to send datas to the server or not
  if (shouldIdraw == true) {
    submitData()
  } else {}
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight)
  exit = new Circ(windowWidth / 12, height - (75 + windowWidth / 12), 65);

  // create a button
  button = createButton("STOP");
  button.position(windowWidth / 3.6, windowHeight / 2 + 550);
  button.mousePressed(finalMap); // go to the second map

  //setting up firebase
  const firebaseConfig = {
    apiKey: "AIzaSyC-fiV18ijZctY5WrQIllaZmQnNQ7FKf10",
    authDomain: "mapstract-74411.firebaseapp.com",
    databaseURL: "https://mapstract-74411.firebaseio.com",
    projectId: "mapstract-74411",
    storageBucket: "mapstract-74411.appspot.com",
    messagingSenderId: "11859346333",
    appId: "1:11859346333:web:253c37d5f8dfdc7036e574",
    measurementId: "G-M7G8BVNG1H"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  database = firebase.database();

  options.lat = myLat;
  options.lng = myLon;
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas)

  //color choice buttons position
  redx = windowWidth * 1 / 6
  redy = windowHeight * 9.9 / 10
  blux = windowWidth * 2 / 6
  bluy = redy
  yelx = windowWidth * 3 / 6
  yely = redy
  grex = windowWidth * 4 / 6
  grey = redy
  purx = windowWidth * 5 / 6
  pury = redy
}

// function deviceMoved() {
//   value = value - 1;
//   if (value > -7) {
//     value = -7
//   }
// }

function draw() {
  //buttons width
  radc = windowWidth / 20
  rectMode(CENTER)
  noStroke()

  exit.display();
  //converts coordinates to pixels
  var point = myMap.latLngToPixel(myLat, myLon)
  //drawing location
  if (shouldIdraw == true) {
    fill(colorList[listpick])
    radius = 15;
    circle(point.x, point.y, radius)
  } else {}

  //buttons choice color
  fill('#ef1b1b')
  rect(windowWidth - (radc), windowHeight / 10, radc * 2, windowHeight / 5)
  fill('#3127ff')
  rect(windowWidth - (radc), windowHeight * 3 / 10, radc * 2, windowHeight / 5)
  fill('#ffdb27')
  rect(windowWidth - (radc), windowHeight * 5 / 10, radc * 2, windowHeight / 5)
  fill('#2dc943')
  rect(windowWidth - (radc), windowHeight * 7 / 10, radc * 2, windowHeight / 5)
  fill('#833df2')
  rect(windowWidth - (radc), windowHeight * 9 / 10, radc * 2, windowHeight / 5)
}

// function of the circles
function Circ(_x, _y, _rad) {

  this.x = _x;
  this.y = _y;
  this.size = _rad;
  this.color = "#fc6d09";

  this.display = function() {
    fill(this.color);
    rect(this.x, this.y, this.size);
  }

}

// function for the final map with all the users' drawings
function finalMap() {
    console.log("hey")
    shouldIdraw = false;
    window.open('./index_results.html', '_self')

}

//sends points datas to the server
function submitData() {
  var data = {
    lat: myLat,
    lon: myLon,
    color: listpick,
    radius: radius
  }
  ref = database.ref('pos');
  ref.push(data);
}

//function that sets the color of the drawing
function mouseClicked() {
  if (mouseY < windowHeight / 5 && (mouseX > (windowWidth - (radc * 2)))) {
    listpick = 0;
    shouldIdraw = true;
  } else
  if (mouseY < windowHeight * 2 / 5 && (mouseX > (windowWidth - (radc * 2)))) {
    listpick = 2;
    shouldIdraw = true;
  } else
  if (mouseY > windowHeight * 4 / 5 && (mouseX > (windowWidth - (radc * 2)))) {
    listpick = 5;
    shouldIdraw = true
  } else
  if (mouseY > windowHeight * 3 / 5 && (mouseX > (windowWidth - (radc * 2)))) {
    listpick = 3;
    shouldIdraw = true
  } else
  if (mouseY > windowHeight * 2 / 5 && (mouseX > (windowWidth - (radc * 2)))) {
    listpick = 1;
    shouldIdraw = true
  } else {}
}

//
// function touchEnded(event) {
//   DeviceOrientationEvent.requestPermission()
// }
