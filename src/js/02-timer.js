import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

startButton.disabled = true;
let selectedDate;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimerDisplay(days, hours, minutes, seconds) {
  daysElement.textContent = String(days).padStart(2, '0');
  hoursElement.textContent = String(hours).padStart(2, '0');
  minutesElement.textContent = String(minutes).padStart(2, '0');
  secondsElement.textContent = String(seconds).padStart(2, '0');
}

function addLeadingZero() {
  const difference = selectedDate - new Date().getTime();
  const { days, hours, minutes, seconds } = convertMs(difference);
  updateTimerDisplay(days, hours, minutes, seconds);
}

startButton.addEventListener('click', () => {
  Notiflix.Notify.success('The countdown has begun!');
  const timer = setInterval(() => {
    startButton.disabled = true;
    addLeadingZero();

    const remainingTimeMs = selectedDate - new Date().getTime();
    if (remainingTimeMs <= 0) {
      clearInterval(timer);
      Notiflix.Notify.failure('Your time has flown by!');
    }
  }, 1000);
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      Notiflix.Notify.warning('Виберіть дату у майбутньому!');
      startButton.disabled = true;
    } else {
      Notiflix.Notify.success('Таймер розпочато!');
      startButton.disabled = false;
      selectedDate = selectedDates[0].getTime();
    }
  },
};

flatpickr('#datetime-picker', options);