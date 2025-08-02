'use strict';

///////////////////////////////////////
// Elements

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

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

///////////////////////////////////////
// Page navigation

// Event delegation:
// 1) add event listener to common parent
// 2) in the event handler determine which element generated the event with event.target property

// Page navigation using event delegation on the nav links container
document
  .querySelector('.nav__links')
  .addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default anchor link behavior (instant jump)

    if (event.target.classList.contains('nav__link')) {
      // getAttribute() gets the relative url
      const id = event.target.getAttribute('href'); // Get target section ID from href (e.g., '#section--1')
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  });

///////////////////////////////////////
// Tabbed component

// Use event delegation to handle tab clicks
tabsContainer.addEventListener('click', function (event) {
  // Matching strategy: use closest() to find the actual tab element (in case inner elements are clicked)
  const clickedTab = event.target.closest('.operations__tab');

  // Guard clause: Exit if no tab was clicked
  if (!clickedTab) {
    return;
  }

  // Remove active state from all tabs
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));

  // Activate the clicked tab
  clickedTab.classList.add('operations__tab--active');

  // Remove active state from all tab content areas
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  // Activate the corresponding tab content using data-tab attribute
  document
    .querySelector(`.operations__content--${clickedTab.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////
// Menu fade animation on hover

// This effect dims the opacity of sibling nav links and logo when one nav link is hovered over,
// creating a subtle fade animation for better focus/visual feedback.

const handleHover = function (event, opacity) {
  // Use matching strategy to ensure we're targeting a nav link
  if (event.target.classList.contains('nav__link')) {
    const hoveredLink = event.target;
    const siblings = hoveredLink.closest('.nav').querySelectorAll('.nav__link');
    const logo = hoveredLink.closest('.nav').querySelector('img');

    // Reduce opacity of other links
    siblings.forEach(link => {
      if (link !== hoveredLink) {
        link.style.opacity = opacity;
      }
    });

    // Dim the logo
    logo.style.opacity = opacity;
  }
};

// Event delegation
nav.addEventListener('mouseover', event => handleHover(event, 0.5));

// Restore opacity when mouse leaves the link
nav.addEventListener('mouseout', event => handleHover(event, 1));
