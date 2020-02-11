let myMap;
let canvas;
let posx, posy;
var position, radius;
var value = 0;
var listpick = 4;
var redx, redy, blux, bluy, yelx, yely, radc;
var exit, ref;
var database;
var shouldIdraw = false;
var myLat, myLon;
// cambiare coordinate per città, sono sotto
var swuno = 9.059298 // MILANO
var swdue = 45.385749
var neuno = 9.304870
var nedue = 45.541406

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


const options = {
  // lat: 45.4689727,
  // lng: 9.1895752,
  zoom: 17,
  interactive: false,
  style: "mapbox://styles/mapbox/dark-v8",
  pitch: 10,
  maxBounds: bounds,
}


function preload() {

  milano = loadImage("./mappaMilano.png")
  position = watchPosition(positionChanged);
}

function positionChanged(position) {
  myLat = position.latitude;
  myLon = position.longitude;
  if (shouldIdraw == true) {
    submitData()
  } else {}
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight)
  exit = new Rect(windowWidth / 12, height - (75 + windowWidth / 12), 65, 65);


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


  redx = windowWidth * 1 / 4
  redy = windowHeight * 9.9 / 10
  blux = windowWidth * 2 / 4
  bluy = redy
  yelx = windowWidth * 3 / 4
  yely = redy
}

function deviceMoved() {
  value = value - 1;
  if (value > -7) {
    value = -7
  }
}

function draw() {

  radc = windowWidth / 20
  rectMode(CENTER)
  noStroke()

  exit.display();

  var point = myMap.latLngToPixel(myLat, myLon)

  fill(colorList[listpick])
  radius = 15;
  circle(point.x, point.y, radius)


  fill('red')
  rect(windowWidth - (radc), windowHeight / 6, radc * 2, windowHeight / 3)
  fill('yellow')
  rect(windowWidth - (radc), windowHeight * 3 / 6, radc * 2, windowHeight / 3)
  fill('blue')
  rect(windowWidth - (radc), windowHeight * 5 / 6, radc * 2, windowHeight / 3)
}
//il rettangolo a cui applicare la variabile shouldIdraw falsa e a cui
//collegare la pagina successiva
function Rect(_x, _y, _width, _height) {
  this.x = _x;
  this.y = _y;
  this.width = _width;
  this.height = _height;
  this.color = "orange";

  this.display = function() {
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
  }

  this.clicked = function() {
    console.log("hey")
  }

  this.dragged = function() {
    this.x = mouseX;
    this.y = mouseY;

    this.color = 150;
  }

  this.released = function() {
    this.x = _x;
    this.y = _y;

    this.color = 255;
  }
}

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

function mouseClicked() {
  if (mouseY < windowHeight / 3 && (mouseX > (windowWidth - (radc * 2)))) {
    listpick = 0;
    radius = 15;
    shouldIdraw = true;
  } else
  if (mouseY < windowHeight * 2 / 3 && (mouseX > (windowWidth - (radc * 2)))) {
    listpick = 2;
    radius = 15;
    shouldIdraw = true;
  } else
  if (windowWidth - (radc * 2) && (mouseX > (windowWidth - (radc * 2)))) {
    listpick = 1;
    radius = 15;
    shouldIdraw = false; //METTETE LA VARIABILE TRUE E SPOSTATE IL LINK ALLA PAGINA AL PULSANTE
    window.open('./index_result.html', '_self')

  } else {

  }
}


function touchEnded(event) {
  DeviceOrientationEvent.requestPermission()
}
