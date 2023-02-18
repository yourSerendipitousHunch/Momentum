// 1. Clock and calendar

function showTime() {
    const time = document.querySelector('.time');
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;

    // Displays the day of the week, date, month

    function showDate() {
        const fullDate = document.querySelector('.date');
        const options = {month: 'long', day: 'numeric', weekday: 'long', timeZone:'UTC'};
        const currentDate = date.toLocaleDateString('en-US', options);
        fullDate.textContent = currentDate;
    }
    showDate();

    setTimeout(showTime, 1000);
}
showTime();

// 2. Greeting

function showGreeting() {
    const greeting = document.querySelector('.greeting');
    const date = new Date();
    const hours = date.getHours();

    function getTimeOfDay() {
        if (hours < 6) {
            return 'night';
        } else if (hours < 12) {
            return 'morning';
        } else if (hours < 17) {
            return 'afternoon';
        } else {
            return 'evening';
        }
    }
    const timeOfDay = getTimeOfDay();
    const greetingText = `Good ${timeOfDay}`;
    greeting.textContent = greetingText;

    // The user can enter their name

    const name = document.querySelector('.name');

    name.addEventListener('focus', () => {
        name.placeholder = '';
      });

      name.addEventListener('blur', () => {
        name.placeholder = '[Enter your name]';
      });

      function setLocalStorage() {
        localStorage.setItem('name', name.value);
    }
    window.addEventListener('beforeunload', setLocalStorage)

    function getLocalStorage() {
        if(localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
        }
    }
    window.addEventListener('load', getLocalStorage)

    // 3. Image Slider

    function setBg() {

    const body = document.querySelector('body');

    function getRandomNum() {
        Math.floor(Math.random() * 5);
    }
    
    if (timeOfDay == 'night') {
        body.style.backgroundImage = "url('assets/img/night/01.jpeg')";
    } else if (timeOfDay == 'morning') {
        body.style.backgroundImage = "url('assets/img/morning/01.jpg')";
    } else if (timeOfDay == 'afternoon') {
        body.style.backgroundImage = "url('assets/img/afternoon/01.jpeg')";
    } else if (timeOfDay == 'evening') {
        body.style.backgroundImage = "url('assets/img/evening/01.jpeg')";
    } 
    }
    setBg();

    setTimeout(showGreeting, 1000);
}
showGreeting();