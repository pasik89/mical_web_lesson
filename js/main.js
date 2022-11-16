import "../css/normalize.css";
import "../css/main.css";
import "../scss/style.scss";
import "../img/index"

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
