const slider = document.getElementById("mySlider");
const sliderValue = document.getElementById("sliderValue");

const slider1 = document.getElementById("mySlider1");
const sliderValue1 = document.getElementById("sliderValue1");

const slider2 = document.getElementById("mySlider2");
const sliderValue2 = document.getElementById("sliderValue2");

const initializeSliders = () => {
  // Update the text content for the first slider value
  document.getElementById("sliderValue").textContent = parseFloat(
    document.getElementById("mySlider").value
  );

  // Update the text content for the second slider value
  document.getElementById("sliderValue1").textContent = parseFloat(
    document.getElementById("mySlider1").value
  );

  // Update the text content for the third slider value (ensure IDs are correctly matched)
  document.getElementById("sliderValue2").textContent = parseFloat(
    document.getElementById("mySlider2").value
  );
};

slider.addEventListener("input", function () {
  const roundedValue = parseFloat(slider.value).toFixed(2); // Round to 2 decimal places
  sliderValue.textContent = roundedValue;
});

slider1.addEventListener("input", function () {
  const roundedValue = parseFloat(slider1.value).toFixed(2); // Round to 2 decimal places
  sliderValue1.textContent = roundedValue;
});

slider2.addEventListener("input", function () {
  const roundedValue = parseFloat(slider2.value).toFixed(2); // Round to 2 decimal places
  sliderValue2.textContent = roundedValue;
});

// Display the default slider value
// constants
const COLOR_BG = "white";
const COLOR_CUBE = "black";
let SPEED_X = 0.15; //
let SPEED_Y = 0.15; // rps
let SPEED_Z = 0.1; // rps
const POINT3D = function (x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
};

// Update the current slider value (each time you drag the slider handle)

// set up the canvas and context
var canvas = document.createElement("canvas");
document.body.appendChild(canvas);
var ctx = canvas.getContext("2d");

// dimensions
var h = document.documentElement.clientHeight;
var w = document.documentElement.clientWidth;
canvas.height = h;
canvas.width = w;

// colours and lines
ctx.fillStyle = COLOR_BG;
ctx.strokeStyle = COLOR_CUBE;
ctx.lineWidth = w / 50;
ctx.lineCap = "round";

// cube parameters
var cx = w / 2;
var cy = h / 2;
var cz = 0;
var size = h / 4;
var vertices = [
  new POINT3D(cx - size, cy - size, cz - size),
  new POINT3D(cx + size, cy - size, cz - size),
  new POINT3D(cx + size, cy + size, cz - size),
  new POINT3D(cx - size, cy + size, cz - size),
  new POINT3D(cx - size, cy - size, cz + size),
  new POINT3D(cx + size, cy - size, cz + size),
  new POINT3D(cx + size, cy + size, cz + size),
  new POINT3D(cx - size, cy + size, cz + size),
];
var edges = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0], // back face
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 4], // front face
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7], // connecting sides
];

// set up the animation loop
var timeDelta,
  timeLast = 0;
requestAnimationFrame(loop);

function loop(timeNow) {
  let SPEED_X = slider.value; //
  let SPEED_Y = slider1.value; //
  let SPEED_Z = slider2.value; //

  // calculate the time difference
  timeDelta = timeNow - timeLast;
  timeLast = timeNow;

  // background
  ctx.fillRect(0, 0, w, h);

  // rotate the cube along the z axis
  let angle = timeDelta * 0.001 * SPEED_Z * Math.PI * 2;
  for (let v of vertices) {
    let dx = v.x - cx;
    let dy = v.y - cy;
    let x = dx * Math.cos(angle) - dy * Math.sin(angle);
    let y = dx * Math.sin(angle) + dy * Math.cos(angle);
    v.x = x + cx;
    v.y = y + cy;
  }

  // rotate the cube along the x axis
  angle = timeDelta * 0.001 * SPEED_X * Math.PI * 2;
  for (let v of vertices) {
    let dy = v.y - cy;
    let dz = v.z - cz;
    let y = dy * Math.cos(angle) - dz * Math.sin(angle);
    let z = dy * Math.sin(angle) + dz * Math.cos(angle);
    v.y = y + cy;
    v.z = z + cz;
  }

  // rotate the cube along the y axis
  angle = timeDelta * 0.001 * SPEED_Y * Math.PI * 2;
  for (let v of vertices) {
    let dx = v.x - cx;
    let dz = v.z - cz;
    let x = dz * Math.sin(angle) + dx * Math.cos(angle);
    let z = dz * Math.cos(angle) - dx * Math.sin(angle);
    v.x = x + cx;
    v.z = z + cz;
  }

  // draw each edge
  for (let edge of edges) {
    ctx.beginPath();
    ctx.moveTo(vertices[edge[0]].x, vertices[edge[0]].y);
    ctx.lineTo(vertices[edge[1]].x, vertices[edge[1]].y);
    ctx.stroke();
  }

  // call the next frame
  requestAnimationFrame(loop);
}

document.addEventListener("DOMContentLoaded", function () {
  initializeSliders();
});

window.onload = function () {
  window.scrollTo(0, document.body.scrollHeight);
};

document.getElementById('modal').addEventListener('click', function() {
  this.style.display = 'none';
});

const LoadingScreen = require('./loadingScreen.js');
let loadingScreen = new LoadingScreen(this);
loadingScreen.simulateLoading(2000);
