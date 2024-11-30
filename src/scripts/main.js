/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use strict';

// #region switch-theme
const button = document.getElementById('theme-switcher');
const mainImg = document.getElementById('main-img');

function changeTheme() {
  if (document.body.classList.contains('pink-theme')) {
    document.body.classList.remove('pink-theme');
    button.firstElementChild.style.transform = 'translateX(0%)';
  } else {
    document.body.classList.add('pink-theme');
    button.firstElementChild.style.transform = 'translateX(100%)';
  }
}

button.addEventListener('click', changeTheme);
// #endregion switch-theme

// #region slider-handler
const slides = document.querySelectorAll('.slide-item');
let slideIndex = 0;
let intervalId = null;

document.addEventListener('DOMContentLoaded', initializeSlider);

function initializeSlider() {
  if (slides.length > 0) {
    slides[slideIndex].classList.add('slide--fade-in', 'slide--show');
    intervalId = window.setInterval(nextSlide, 2500);
  }
}

function showSlide(index) {
  if (index >= slides.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = slides.length - 1;
  } else {
    slideIndex = index;
  }

  slides.forEach((slide, i) => {
    if (i === slideIndex) {
      slide.classList.add('slide--fade-in', 'slide--show');
      slide.classList.remove('slide--fade-out');
    } else {
      slide.classList.remove('slide--fade-in', 'slide--show');
      slide.classList.add('slide--fade-out');
    }
  });
}

function prevSlide() {
  clearInterval(intervalId);
  showSlide(slideIndex - 1);
  intervalId = window.setInterval(nextSlide, 2500);
}

function nextSlide() {
  clearInterval(intervalId);
  showSlide(slideIndex + 1);
  intervalId = window.setInterval(nextSlide, 2500);
}
// #endregion

// #region form-handler
function clearErrors() {
  document
    .querySelectorAll('.form__input--hasError')
    .forEach(function(element) {
      element.classList.remove('form__input--hasError');
    });

  document
    .querySelectorAll('.form__error-message')
    .forEach(function(errorSpan) {
      errorSpan.textContent = '';
    });

  document.getElementById('form__button').removeAttribute('disabled');
}

function handleSubmit(event) {
  event.preventDefault();

  clearErrors();

  const form = event.target;
  const email = form.email.value;
  const name = form.name.value;
  const message = form.message.value;
  const phone = form.phone.value;

  let valid = true;

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailPattern.test(email)) {
    valid = false;

    document.getElementById('email').classList.add('form__input--hasError');

    document.getElementById('email-error').textContent
      = 'Please enter a valid email address (e.g. example@domain.com).';
  }

  if (name.trim() === '') {
    valid = false;
    document.getElementById('name').classList.add('form__input--hasError');

    document.getElementById('name-error').textContent
      = 'Please enter your name.';
  }

  if (message.trim() === '') {
    valid = false;
    document.getElementById('message').classList.add('form__input--hasError');

    document.getElementById('message-error').textContent
      = 'Please enter a message.';
  }

  const phonePattern = /^\+?\d{10,15}$/;

  if (!phonePattern.test(phone)) {
    valid = false;
    document.getElementById('phone').classList.add('form__input--hasError');

    document.getElementById('phone-error').textContent
      = 'Please enter a valid phone number (e.g. +1234567890).';
  }

  if (valid) {
    window.location.reload();
  } else {
    document.getElementById('form__button').disabled = true;
  }
}

window.addEventListener('load', function() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
});
// #endregion

// #region menu
const menuToggle = document.getElementById('icon--menu');
const mobileMenu = document.getElementById('menu');
let lastScrollPosition = 0;

menuToggle.addEventListener('click', function() {
  if (mobileMenu.classList.contains('aside__menu--hidden')) {
    lastScrollPosition = window.scrollY;
    mobileMenu.classList.remove('aside__menu--hidden');
    document.body.style.overflow = 'hidden';
    menuToggle.classList.remove('icon--menu');
    menuToggle.classList.add('icon--close');
  } else {
    mobileMenu.classList.add('aside__menu--hidden');
    document.body.style.overflow = '';
    menuToggle.classList.remove('icon--close');
    menuToggle.classList.add('icon--menu');
    window.scrollTo(0, lastScrollPosition);
  }
});

function onMenuLinkClick() {
  mobileMenu.classList.add('aside__menu--hidden');
  menuToggle.classList.remove('icon--close');
  menuToggle.classList.add('icon--menu');
  document.body.style.overflow = '';
}
// #endregion

// #region intersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');

      setTimeout(() => {
        entry.target.classList.remove('hide', 'hide-left', 'hide-right');
      }, 3000);
    }
  });
});

const hiddenElements = document.querySelectorAll('.hide');
const hiddenElementsLeft = document.querySelectorAll('.hide-left');
const hiddenElementsRight = document.querySelectorAll('.hide-right');
const allHidden = [...hiddenElements].concat(
  [...hiddenElementsLeft],
  [...hiddenElementsRight],
);

allHidden.forEach((el) => observer.observe(el));
// #endregion
