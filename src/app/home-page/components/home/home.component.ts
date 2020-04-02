import { Component, OnInit, HostListener } from '@angular/core';
import { faBars, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {

  faBars = faBars;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;

  navLinks = [];
  carlogo = [];
  developersPic = [];

  constructor() { }

  ngOnInit(): void {
    //links in navbar
    this.navLinks = [
      { key: 1, href: "#", id: "linkHome", innerHTML: "Home" },
      { key: 2, href: "#privateLease", id: "linkLease", innerHTML: "Why Private Lease" },
      { key: 3, href: "#benefits", id: "linkBenefits", innerHTML: "Benefits" },
      { key: 4, href: "#developers", id: "linkDevelopers", innerHTML: "Developers" },
      { key: 5, href: null, id: "login", innerHTML: "Login/Register" }
    ];
    // car logo
    this.carlogo = [
      { src: "../../assets/images/svg/audi.svg", alt: "audi" },
      { src: "../../assets/images/svg/bmw.svg", alt: "bmw" },
      { src: "../../assets/images/svg/toyota.svg", alt: "toyota" },
      { src: "../../assets/images/svg/ford.svg", alt: "ford" },
      { src: "../../assets/images/svg/tesla.svg", alt: "tesla" },
    ];
    //developersPicture
    this.developersPic = [
      { src: "../../assets/images/jpg/bhavya.jpg", alt: "Bhavya Shah", name: "Bhavya Shah" },
      { src: "../../assets/images/jpg/dharan.jfif", alt: "Dharan Padhiyar", name: "Dharan Padhiyar" },
      { src: "../../assets/images/jpg/drashti bhimani.jfif", alt: "Drashti Bhimani", name: "Drashti Bhimani" }
    ]
  }

  Route() {
    document.getElementById('navbarNav').classList.remove("show")
  }
  
  @HostListener('window:scroll', ['$event'])
  ChangeStyleOfHeaderBar() {

    let anchor: NodeListOf<HTMLElement> = document.querySelectorAll('.nav-item>a')
    let header = document.getElementById('headerBar')
    let icon = document.getElementById('changeColor')
    let logoinverse: HTMLElement = document.querySelector('#headerBar img')

    if (window.pageYOffset > 250) {
      //anchor
      for (let index = 0; index < anchor.length; index++) {
        anchor[index].style.color = "black"
      }
      //header
      header.style.backgroundColor = "white"
      header.classList.add("shadow-lg")
      header.style.transition = "all 300ms ease"
      //icon
      icon.style.color = "black"
      //logoinverse
      logoinverse.style.filter = "invert(1)"
    }
    else {
      //anchor
      for (let index = 0; index < anchor.length; index++) {
        anchor[index].style.removeProperty("color")
      }
      //header
      header.style.removeProperty("background-color")
      header.classList.remove("shadow-lg")
      header.style.transition = "all 250ms ease"

      //icon
      icon.style.removeProperty("color")

      //logoinverse
      logoinverse.style.removeProperty("filter")
      logoinverse.style.filter = "brightness(70%)"
    }
  }
}
