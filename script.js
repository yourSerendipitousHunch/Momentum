// 1. Clock and calendar

// Time is displayed in 24-hour format

const time = document.querySelector('.time');
const date = new Date();
const currentTime = date.toLocaleTimeString();
function showTime() {
    time.textContent = currentTime;
    setTimeout(showTime, 1000);
  }
  showTime();

  // Displays the day of the week, date, month

