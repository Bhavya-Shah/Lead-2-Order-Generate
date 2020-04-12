import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import {
  faBars,
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/services/auth.service';
import { take, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit, OnDestroy {
  faBars = faBars
  faCheckCircle = faCheckCircle
  faTimesCircle = faTimesCircle

  navLinks = []
  carlogo = []
  developersPic = []
  flag = false
  username: string = null
  userSub: Subscription

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe((user) => {
      const isAuth = !!user;
      // console.log(isAuth);
      if (isAuth) {
        this.username = user.username;
      } else {
        this.username = null
      }
    });

    // links in navbar
    this.navLinks = [
      { key: 1, href: '#', id: 'linkHome', innerHTML: 'Home' },
      { key: 2, href: '#privateLease', id: 'linkLease', innerHTML: 'Why Private Lease' },
      { key: 3, href: '#benefits', id: 'linkBenefits', innerHTML: 'Benefits' },
      { key: 4, href: '#developers', id: 'linkDevelopers', innerHTML: 'Developers' },
      { key: 5, href: null, id: 'login', innerHTML: 'Login/Register' },
    ];
    // car logo
    this.carlogo = [
      { src: '../../assets/images/svg/audi.svg', alt: 'audi' },
      { src: '../../assets/images/svg/bmw.svg', alt: 'bmw' },
      { src: '../../assets/images/svg/toyota.svg', alt: 'toyota' },
      { src: '../../assets/images/svg/ford.svg', alt: 'ford' },
      { src: '../../assets/images/svg/tesla.svg', alt: 'tesla' },
    ];
    // developersPicture
    this.developersPic = [
      {
        src: '../../assets/images/jpg/bhavya.jpg',
        alt: 'Bhavya Shah',
        name: 'Bhavya Shah',
      },
      {
        src: '../../assets/images/jpg/dharan.jfif',
        alt: 'Dharan Padhiyar',
        name: 'Dharan Padhiyar',
      },
      {
        src: '../../assets/images/jpg/drashti bhimani.jfif',
        alt: 'Drashti Bhimani',
        name: 'Drashti Bhimani',
      },
    ];
  }

  targetNavbarNav() {
    var btn = document.getElementById('navbarNav');
    btn.classList.add('animated');
    btn.classList.toggle('collapse');
    btn.classList.toggle('fadeInLeft');
  }

  gotoId() {
    document.getElementById('navbarNav').classList.add('collapse');
  }

  @HostListener('window:scroll')
  ChangeStyleOfHeaderBar() {
    var anchor: NodeListOf<HTMLElement> = document.querySelectorAll('.nav-item>a');
    var header = document.getElementById('headerBar');
    var icon = document.getElementById('changeColor');
    var logoinverse: HTMLElement = document.querySelector('#headerBar img');

    if (window.pageYOffset > 250) {
      // anchor
      anchor.forEach((tag) => (tag.style.color = 'black'));
      // header
      header.style.backgroundColor = 'white';
      header.classList.add('shadow-lg');
      header.style.transition = 'all 800ms ease';
      // icon
      icon.style.color = 'black';
      // logoinverse
      logoinverse.style.filter = 'invert(1)';
    } else {
      // anchor
      anchor.forEach((tag) => tag.style.removeProperty('color'));
      // header
      header.style.removeProperty('background-color');
      header.classList.remove('shadow-lg');
      header.style.transition = 'all 800ms ease';
      // icon
      icon.style.removeProperty('color');
      // logoinverse
      logoinverse.style.removeProperty('filter');
      logoinverse.style.filter = 'brightness(70%)';
    }
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}