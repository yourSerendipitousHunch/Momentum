import playList from './playList.js';

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
    const img = new Image();
    img.src = imageUrls[timeOfDay][imageIndex];
    img.onload = () => {
        body.style.backgroundImage = `url(${img.src})`;
    };
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

    // disable background image in css
    body.style.backgroundImage = "none";

    setBg();

    // Weather widget

    const weatherIcon = document.querySelector('.weather-icon');
    const temperature = document.querySelector('.temperature');
    const weatherDescription = document.querySelector('.weather-description');
    
    const cityInput = document.querySelector('.city');
    cityInput.addEventListener('input', getWeather);
    
    async function getWeather() {
      const city = cityInput.value;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=96ff6ee9485f09be21bf92cfb9518362&units=metric`;
      const res = await fetch(url);
      const data = await res.json();
    
      if (city) {
        localStorage.setItem('city', city);
      } else {
        localStorage.setItem('city', '');
        temperature.textContent = '';
        weatherDescription.textContent = '';
      }
    
      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${data.main.temp}°C`;
      weatherDescription.textContent = data.weather[0].description;
    }
    
    window.addEventListener('load', () => {
      const city = localStorage.getItem('city');
      if (city) {
        cityInput.value = city;
        getWeather();
      }
    });    

// 5. Quote of the day widget

// Define a global variable to store the quotes
let quotes = [];

async function getQuotes() {  
    const res = await fetch('data.json');
    const data = await res.json(); 

    // Store the quotes in the global variable
    quotes = data;

    // Display the first quote on page load
    displayQuote();
}

function displayQuote() {
    const quoteText = document.querySelector('.quote');
    const author = document.querySelector('.author');

    // Randomly select a quote from the stored quotes
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    // Display the selected quote and author
    quoteText.textContent = quote.text;
    author.textContent = quote.author;
}

// Call the getQuotes function on page load
getQuotes();

// Add an event listener to the change-quote button
const changeQuote= document.querySelector('.change-quote');
changeQuote.addEventListener('click', displayQuote);

// 6. Audio player

const playerControls = document.querySelector('.player-controls');
const playListContainer = document.querySelector('.play-list');
const audio = new Audio();
let isPlay = false;
let playNum = 0;

function togglePlay() {
    if (!isPlay) {
      playAudio(playNum);
      playerControls.querySelector('.play').classList.add('pause');
      isPlay = true;
    } else {
      audio.pause();
      playerControls.querySelector('.play').classList.remove('pause');
      isPlay = false;
    }
  }  

function playAudio(num) {
  audio.src = playList[num].src;
  audio.play();
  playerControls.querySelector('.play').classList.add('pause');
  isPlay = true;
}

function playNext() {
  playNum++;
  if (playNum > playList.length - 1) {
    playNum = 0;
  }
  playAudio(playNum);
}

function playPrev() {
  playNum--;
  if (playNum < 0) {
    playNum = playList.length - 1;
  }
  playAudio(playNum);
}

playerControls.querySelector('.play').addEventListener('click', togglePlay);
playerControls.querySelector('.play-next').addEventListener('click', playNext);
playerControls.querySelector('.play-prev').addEventListener('click', playPrev);

playList.forEach((track, index) => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.innerHTML = `${track.title}`;
  playListContainer.append(li);
  li.addEventListener('click', () => {
    playAudio(index);
  });
});

}
showGreeting();


