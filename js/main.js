import "../css/normalize.css";
// import "../css/main.css";
import "../scss/style.scss";
import "../img/index"
import {httpPost} from './postHttp.js';

class Header extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
      <nav>
      <a><img src="img/logo.png" alt="logo"></a>
          <a>Home </a>
          <a>About </a>
          <a>Furnitures </a>
          <a>Testimonial </a>
          <a>Contact Us</a>
          <a><i class="fa-regular fa-user"></i>Login/Register</a>
          <a><i class="fa-solid fa-magnifying-glass"></i></a>
      </nav>
      `;
  }
}

customElements.define('main-header', Header);

import { httpGet } from "./http";


// async function getCarouselData() {
//   try {
//       const data = await httpGet('carousel')
//       console.log( data, 'data');
//   }
//   catch {

//   }
// }

// getCarouselData()

const carouselContainer = document.querySelector('.carousel-section__container');
const carouselList = document
  .createElement('ul');
carouselContainer.appendChild(carouselList);
carouselList.classList.add('carousel-section__container__list')

const carouselItems = await httpGet('carousel');

carouselItems.forEach(carouselItem => {

  console.log(carouselItem)
  const carouselItemHtml = `
      <h4 class="carousel-section__container__list__item__title">${carouselItem.title}</h4>
      <img src="img/${carouselItem.imgName}" class="carousel-section__container__list__item__image"${carouselItem.imgName}></img>
      <p class="carousel-section__container__list__item__paragraph">${carouselItem.description}</p>
  `

  document.querySelector('.carousel-section__container__list')

  const listElement = document.createElement('li');

  listElement.classList.add('carousel-section__container__list__item');

  listElement.innerHTML = carouselItemHtml;

  carouselList.appendChild(listElement);
});



function getContactFormData(form) {
  const contactFormData = new FormData(form) 

  // console.log(Object.fromEntries(contactFormData))
  return Object.fromEntries(contactFormData)
}

document.querySelector('#contactForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = getContactFormData(event.target);
  // console.log(event);
  console.log(data);
  httpPost('applications', JSON.stringify(data));
})
