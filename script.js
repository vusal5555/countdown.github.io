'use strict';
const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');
const countDownEl = document.getElementById('countdown');
const countDownElTitle = document.getElementById('countdown-title');
const countDownElBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle;
let countdownDate;
let countdownActive = new Date();
let countdownInterval;
let savedCountdown;

const sec = 1000;
const min = sec * 60;
const hour = min * 60;
const day = hour * 24;

const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

const updateDOM = function () {
  countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownActive - now;

    if (distance < 0) {
      countDownEl.hidden = true;
      clearInterval(countdownInterval);
      completeEl.hidden = false;
      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
    } else {
      countDownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = Math.floor(distance / day);
      timeElements[1].textContent = Math.floor((distance % day) / hour);
      timeElements[2].textContent = Math.floor((distance % hour) / min);
      timeElements[3].textContent = Math.floor((distance % min) / sec);

      countDownEl.hidden = false;
      completeEl.hidden = true;
    }
    inputContainer.hidden = true;
  }, sec);
};

const setDate = function (e) {
  e.preventDefault();
  countdownTitle = e.target[0].value;
  countdownDate = e.target[1].value;

  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };

  localStorage.setItem('countdown', JSON.stringify(savedCountdown));

  if (countdownDate === '') {
    alert('Please enter a valid date');
  } else {
    countdownActive = new Date(countdownDate).getTime();
    updateDOM();
  }
};

const reset = function () {
  countDownEl.hidden = true;
  inputContainer.hidden = false;
  clearInterval(countdownInterval);
  countdownTitle = '';
  countdownDate = '';
  completeEl.hidden = true;
  localStorage.removeItem('countdown');
};

const restorePreviousDate = function () {
  if (localStorage.getItem('countdown')) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem('countdown'));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownActive = new Date(countdownDate).getTime();
    updateDOM();
  }
};

countdownForm.addEventListener('submit', setDate);
countDownElBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

restorePreviousDate();
