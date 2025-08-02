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
const header = document.querySelector('.header');

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

// Generic handler function for both mouseover and mouseout events.
// The value of `this` will be manually set using bind() to control the target opacity.
const handleHover = function (event) {
  // Use matching strategy to ensure we're targeting a nav link
  if (event.target.classList.contains('nav__link')) {
    const hoveredLink = event.target;
    const siblings = hoveredLink.closest('.nav').querySelectorAll('.nav__link');
    const logo = hoveredLink.closest('.nav').querySelector('img');

    // Apply the bound opacity (this) to all siblings and logo except the hovered link
    siblings.forEach(link => {
      if (link !== hoveredLink) {
        link.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

// Event delegation
// Attach event handlers with bind to dynamically set `this` to the desired opacity value
nav.addEventListener('mouseover', handleHover.bind(0.5));

// Restore opacity when mouse leaves the link
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// Sticky navigation: Intersection Observer API

// Get the height of the nav to offset the sticky trigger point
const navHeight = nav.getBoundingClientRect().height;

// Callback function for the Intersection Observer
// This is called whenever the header (target element) intersects the viewport (root)
// Entries is an array of observed intersection changes (only one here)
const stickyNav = function (entries) {
  const [entry] = entries; // Destructure the first (and only) entry

  // When the header is not intersecting the viewport, make nav sticky
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    // Remove sticky class when header is back in view
    nav.classList.remove('sticky');
  }
};

const obsOptions = {
  root: null, // null means we observe intersection relative to the viewport
  threshold: 0, // trigger as soon as the target is out of view
  rootMargin: `-${navHeight}px`,
};

// Create the observer and observe the header section
const headerObserver = new IntersectionObserver(stickyNav, obsOptions);
headerObserver.observe(header);
