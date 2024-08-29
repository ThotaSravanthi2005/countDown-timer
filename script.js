let countdown;
let isRunning = false;
let remainingTime = 0;

const timerDisplay = document.getElementById('timer-display');
const hoursInput = document.getElementById('hours-input');
const minutesInput = document.getElementById('minutes-input');
const secondsInput = document.getElementById('seconds-input');
const setButton = document.getElementById('set-btn');
const startButton = document.getElementById('start-btn');
const pauseButton = document.getElementById('pause-btn');
const stopButton = document.getElementById('stop-btn');
const resetButton = document.getElementById('reset-btn');

// Function to format time
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Function to update the timer display
function updateDisplay() {
  timerDisplay.textContent = formatTime(remainingTime);
}

// Function to start the countdown
function startCountdown() {
  if (isRunning) {
    alert('Timer is already running!');
    return;
  }

  if (remainingTime <= 0) {
    alert('Please set a valid time to start the countdown.');
    return;
  }

  isRunning = true;
  countdown = setInterval(() => {
    remainingTime--;

    if (remainingTime < 0) {
      clearInterval(countdown);
      isRunning = false;
      alert('Time is up!');
      remainingTime = 0;
    }

    updateDisplay();
  }, 1000);
}

// Function to pause the countdown
function pauseCountdown() {
  if (!isRunning) {
    alert('Timer is not running!');
    return;
  }

  clearInterval(countdown);
  isRunning = false;
}

// Function to stop the countdown
function stopCountdown() {
  clearInterval(countdown);
  isRunning = false;
  remainingTime = 0;
  updateDisplay();
}

// Function to reset the countdown
function resetCountdown() {
  clearInterval(countdown);
  isRunning = false;
  remainingTime = 0;
  updateDisplay();
}

// Function to set the timer based on user input
function setTimer() {
  if (isRunning) {
    alert('Stop the timer before setting a new time.');
    return;
  }

  const hours = parseInt(hoursInput.value, 10) || 0;
  const minutes = parseInt(minutesInput.value, 10) || 0;
  const seconds = parseInt(secondsInput.value, 10) || 0;

  if (hours < 0 || minutes < 0 || seconds < 0 || minutes > 59 || seconds > 59) {
    alert('Please enter valid numbers for hours, minutes, and seconds.');
    return;
  }

  remainingTime = (hours * 3600) + (minutes * 60) + seconds;
  updateDisplay();
}

// Event listeners for buttons
setButton.addEventListener('click', setTimer);
startButton.addEventListener('click', startCountdown);
pauseButton.addEventListener('click', pauseCountdown);
stopButton.addEventListener('click', stopCountdown);
resetButton.addEventListener('click', resetCountdown);

// Initialize display
updateDisplay();