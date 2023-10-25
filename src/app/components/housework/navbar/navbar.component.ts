import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  _router : Router = inject(Router)

  isMenuShowing = false

  toggleMenu() {
    this.isMenuShowing = !this.isMenuShowing
  }
  
  home() {
    this._router.navigateByUrl('').then(() => window.location.reload())
  }

  logout() {
    localStorage.clear()
    this._router.navigateByUrl('/login')
  }

  plan() {
    this._router.navigateByUrl('/plan').then(() => window.location.reload())
  }
}
