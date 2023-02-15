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
    setTimeout(showGreeting, 1000);
}
showGreeting();