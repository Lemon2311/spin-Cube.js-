import { Cube } from "./cube.js";
const cube = new Cube(document);

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
  cube.changeXAxisAngularVelocity(roundedValue);
});

slider1.addEventListener("input", function () {
  const roundedValue = parseFloat(slider1.value).toFixed(2); // Round to 2 decimal places
  sliderValue1.textContent = roundedValue;
  cube.changeYAxisAngularVelocity(roundedValue);
});

slider2.addEventListener("input", function () {
  const roundedValue = parseFloat(slider2.value).toFixed(2); // Round to 2 decimal places
  sliderValue2.textContent = roundedValue;
  cube.changeZAxisAngularVelocity(roundedValue);
});

document.addEventListener("DOMContentLoaded", function () {
  initializeSliders();
});

window.onload = function () {
  window.scrollTo(0, document.body.scrollHeight);
};
