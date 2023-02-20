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

    // input adapt to the amount of content 
    
    name.addEventListener('input', () => {
        name.setAttribute('size', name.value.length);
      });

    // 3. Image Slider

    const body = document.querySelector('body');
    let imageIndex = 0;

    const imageUrls = {
        night: ['assets/img/night/01.jpg', 'assets/img/night/02.jpg', 'assets/img/night/03.jpg'],
        morning: ['assets/img/morning/01.jpg', 'assets/img/morning/02.jpg', 'assets/img/morning/03.jpg'],
        afternoon: ['assets/img/afternoon/01.jpg', 'assets/img/afternoon/02.jpg', 'assets/img/afternoon/03.jpg'],
        evening: ['assets/img/evening/01.jpg', 'assets/img/evening/02.jpg', 'assets/img/evening/03.jpg']
    };

    function setBg() {
        body.style.backgroundImage = `url(${imageUrls[timeOfDay][imageIndex]})`;
    }

    const prevButton = document.querySelector('.slide-prev');
    prevButton.addEventListener('click', () => {
        imageIndex = (imageIndex - 1 + imageUrls[timeOfDay].length) % imageUrls[timeOfDay].length;
        setBg();
    });

    const nextButton = document.querySelector('.slide-next');
    nextButton.addEventListener('click', () => {
        imageIndex = (imageIndex + 1) % imageUrls[timeOfDay].length;
        setBg();
    });
    setBg();

    // Weather widget

    const weatherIcon = document.querySelector('.weather-icon');
    const temperature = document.querySelector('.temperature');
    const weatherDescription = document.querySelector('.weather-description');

    const cityInput = document.querySelector('.city');
    cityInput.addEventListener('change', getWeather);

    async function getWeather() {
        const city = cityInput.value;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=96ff6ee9485f09be21bf92cfb9518362&units=metric`;
        const res = await fetch(url);
        const data = await res.json();

        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp}°C`;
        weatherDescription.textContent = data.weather[0].description;
      }
      getWeather()
}
showGreeting();