import "../css/normalize.css";
// import "../css/main.css";
import "../scss/style.scss";
import "../img/index"
import {httpPost} from './postHttp.js';
import {httpGet} from './http'

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
const carouselList = document.createElement('ul');
carouselContainer.appendChild(carouselList);
carouselList.classList.add('carousel-section__container__list')

const carouselItems = await httpGet('carousel');

carouselItems.forEach(carouselItem => {

  // console.log(carouselItem)
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


const form = document.querySelector('#contactForm');
const inputForm = document.querySelectorAll('.contact__container__user-data__form__item')

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = getContactFormData(event.target);
  // console.log(event);
  console.log(data);
  httpPost('applications', JSON.stringify(data));
})

// WALIDACJA FORMULARZA - A//

form.addEventListener('submit', () => {
  inputForm.forEach
  console.log(inputForm)
  if (inputForm.value.length !== 0){
    form.submit();
  } else {
    alert("Wypełnij poprawnie wszystkie pola");
  };
})

async function addClients(cliendId) {
  const clientList = document.querySelector('.client-list__table__body');

  // const applicationslItems = await httpGet('applications/1');
    const applicationslItem = await httpGet(`applications/${cliendId}`);
    const tableRow = document.createElement('tr');
  let data = `
  <td>${applicationslItem.fullName}</td>
        <td>${applicationslItem.email}</td>
        <td>${applicationslItem.phoneNumber}</td>
        <td>${applicationslItem.message}</td>
        <td>${applicationslItem.id}</td>
`;



  applicationslItem.roles.forEach(role => {
    console.log(role)
    // clientList.appendChild(`<td>${role.value}</td>`)
    data += `<td>${role.value}</td>`
  })

  tableRow.innerHTML = data;

  console.log(tableRow)

  clientList.appendChild(tableRow);

}




const addButton = document.querySelector('.client-list__add-button')

let clientId = 1

const applicationsList = await httpGet('applications');

function getUserRoles() {
  return applicationsList.map(({ roles }) => {
    console.log(roles)
    return roles;
  })
}

const userRoles = getUserRoles();

console.log(applicationsList, 'applicationsList')

console.log(userRoles, 'userRoles')

addButton.addEventListener('click', () => {
  console.log(applicationsList)
  if(clientId > applicationsList.length) {
    return;
  } else {
    addClients(clientId)
  }

  clientId++;
})
