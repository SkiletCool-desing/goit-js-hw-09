const getRandomHexColor = () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const bodyElement = document.body;
let timerId = null;

function disableButtons(start, stop) {
    startButton.disabled = start;
    stopButton.disabled = stop;
}

startButton.addEventListener('click', () => {
    if (!timerId) {
        timerId = setInterval(() => {
            bodyElement.style.backgroundColor = getRandomHexColor();
        }, 1000);
        disableButtons(true, false);
    }
});

stopButton.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        disableButtons(false, true);
    }
});