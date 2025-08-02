'use strict';

///////////////////////////////////////
// Elements

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');

///////////////////////////////////////
// Modal window

const openModal = function (event) {
  event.preventDefault(); // prevents the page to jump back to the top
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Button scrolling

btnScrollTo.addEventListener('click', function () {
  // THE OLD SCHOOL WAY OF SCROLLING
  // const sec1Coords = section1.getBoundingClientRect();

  // Scrolls the page to the position of section1 using its coordinates relative to the viewport.
  // Adjusts the scroll based on the current scroll position of the page (window.scrollX/Y).
  // This ensures accurate scrolling regardless of the user's current scroll state.
  // window.scrollTo({
  //   left: window.scrollX + sec1Coords.left,
  //   top: window.scrollY + sec1Coords.top,
  //   behavior: 'smooth',
  // });

  // THE MODERN WAY OF SCROLLING
  section1.scrollIntoView({ behavior: 'smooth' });
});
