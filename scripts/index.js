const [hourBox1, hourBox2] = document.getElementsByClassName("hourBox");
const [minBox1, minBox2] = document.getElementsByClassName("minBox");
const [secBox1, secBox2] = document.getElementsByClassName("secBox");

const startStopButton = document.getElementById("StartStopButton");
const addLapButton = document.getElementById("AddLapButton");
const resetButton = document.getElementById("ResetButton");

const lapsBox = document.getElementById("LapsBoxContent");

let totalSecs = 0,
  hours = "00",
  minutes = "00",
  seconds = "00",
  intervalID = 0,
  startPressed = false; // Only true if reset is pressed or the first time

let laps = [];

resetButton.disabled = true;
addLapButton.disabled = true;

function getHMS() {
  const hours = `${Math.floor(totalSecs / 3600)}`.padStart(2, "0");
  const minutes = `${Math.floor((totalSecs % 3600) / 60)}`.padStart(2, "0");
  const seconds = `${Math.floor((totalSecs % 3600) % 60)}`.padStart(2, "0");

  return { hours, minutes, seconds };
}

function renderDigits(isClear) {
  const { hours, minutes, seconds } = getHMS();

  hourBox1.innerHTML = isClear ? "0" : hours[0];
  hourBox2.innerHTML = isClear ? "0" : hours[1];

  minBox1.innerHTML = isClear ? "0" : minutes[0];
  minBox2.innerHTML = isClear ? "0" : minutes[1];

  secBox1.innerHTML = isClear ? "0" : seconds[0];
  secBox2.innerHTML = isClear ? "0" : seconds[1];
}

function startTimeCount() {
  resetButton.disabled = false;
  addLapButton.disabled = false;
  startPressed = true;

  startStopButton.classList.toggle("stop");
  startStopButton.innerHTML = "Stop";

  intervalID = setInterval(() => {
    totalSecs += 1;

    // Render new time
    renderDigits(false);
  }, 996);
}

function stopTimeCount() {
  clearInterval(intervalID);

  startStopButton.classList.toggle("stop");
  startStopButton.innerHTML = "Start";

  startPressed = false;

  addLapButton.disabled = true;
}

function addNewLap() {
  const { hours, minutes, seconds } = getHMS();

  laps.unshift(`${hours}:${minutes}:${seconds}`);
  lapsBox.innerHTML =
    `<p class="lapText">${laps.length}: ${laps[0]}</p>` + lapsBox.innerHTML;
}

function resetCounter() {
  clearInterval(intervalID);
  
  // Clearing digits
  renderDigits(true);

  // Disabling Buttons
  resetButton.disabled = true;
  addLapButton.disabled = true;

  // If stop is pressed before reset, we must check it
  if (startStopButton.classList.contains("stop"))
    startStopButton.classList.toggle("stop");

  startStopButton.innerHTML = "Start";

  startPressed = false;

  // Reseting laps
  lapsBox.innerHTML = "";
  laps = [];

  totalSecs = 0;
}

startStopButton.addEventListener("click", (e) => {
  if (!startPressed) startTimeCount();
  else stopTimeCount();
});

addLapButton.addEventListener("click", (e) => {
  addNewLap();
});

resetButton.addEventListener("click", (e) => {
  resetCounter();
});
