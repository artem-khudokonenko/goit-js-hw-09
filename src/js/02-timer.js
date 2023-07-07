import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const btnEl = document.querySelector('button[data-start]');
const data = document.querySelectorAll('.value');

let timeEnd;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.warning('Please choose a date in the future');
      btnEl.setAttribute('disabled', true);
    } else {
      btnEl.removeAttribute('disabled');
    }

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
    btnEl.addEventListener('click', clickStart);
    function clickStart() {
      btnEl.setAttribute('disabled', true);
      const set = setInterval(() => {
        timeEnd = selectedDates[0] - Date.now();
        const { days, hours, minutes, seconds } = convertMs(timeEnd);
        data[0].textContent = addLeadingZero(days);
        data[1].textContent = addLeadingZero(hours);
        data[2].textContent = addLeadingZero(minutes);
        data[3].textContent = addLeadingZero(seconds);

        if (timeEnd <= 0) {
          clearInterval(set);
          data.forEach(filed => (filed.textContent = '00'));
        }
      }, 1000);
    }
  },
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
const datePicker = flatpickr('#datetime-picker', options);
