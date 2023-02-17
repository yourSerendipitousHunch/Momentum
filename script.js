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
    
    if (timeOfDay == 'night') {
        body.style.backgroundImage = "url('assets/img/night/01.jpeg')";
    } else if (timeOfDay == 'morning') {
        body.style.backgroundImage = "url('assets/img/morning/01.jpg')";
    } else if (timeOfDay == 'afternoon') {
        body.style.backgroundImage = "url('assets/img/afternoon/01.jpeg')";
    } else if (timeOfDay == 'evening') {
        body.style.backgroundImage = "url('assets/img/evening/01.jpeg')";
    } 
    
    // Images can be leafed out by clicks on arrows located on the sides of the screen
    
    // night imgs
    
    const night1 = "url('assets/img/night/01.jpeg')";
    const night2 = "url('assets/img/night/02.jpg')";
    const night3 = "url('assets/img/night/03.png')";
    const night4 = "url('assets/img/night/04.png')";
    const night5 = "url('assets/img/night/05.png')";
    
    const nightimgs = [night1, night2, night3, night4, night5];
    
    const prevImg = document.querySelector('.slide-prev');
    const nextImg = document.querySelector('.slide-next');
    
    let n = 0;
    
    nextImg.addEventListener('click', () => {
        ++n;
        body.style.backgroundImage = nightimgs[n];
        if (n > 4) {
            n = 0;
        }
    });
    }
    setBg();

    setTimeout(showGreeting, 1000);
}
showGreeting();