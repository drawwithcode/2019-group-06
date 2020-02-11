let myMap;
let canvas;
let posx, posy;
var position, radius;
var value = 0;
var listpick = 4;
var lat, lon, col, rad;
var exit, ref;
var database;
var shouldIdraw = false;
var myLat, myLon;
// cambiare coordinate per città, sono sotto
var swuno = 1.019649; // CANTERBURY
var swdue = 51.249429;
var neuno = 1.151313;
var nedue = 51.309454;

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
  zoom: 5,
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

  } else {}
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight)

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

  var ref = database.ref('pos');
  ref.on('value', gotData, errData)

  function gotData(data) {

    var pos = data.val();
    var keys = Object.keys(pos)
    for (var i = 0; i<keys.length; i++) {
      var k = keys[i];
      var lat = pos[k].lat
      var lon = pos[k].lon
      var col = pos[k].color
      var rad = pos[k].radius
      console.log(lat, lon, col, rad)
      var get = myMap.latLngToPixel(lat, lon);
      var colornumb = colorList[col]
      console.log(colornumb)
      stroke(colornumb, 25)
      strokeWeight(5)
      fill(colorList[col])
      circle(get.x,get.y,rad)

    }
  }

  function errData(err) {
    console.log('Error!');
    console.log(err);
  }

  options.lat = myLat;
  options.lng = myLon;
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas)
}

function draw() {

}



function touchEnded(event) {
  DeviceOrientationEvent.requestPermission()
}
