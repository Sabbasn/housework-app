import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  _router : Router = inject(Router)
  _cookie : CookieService = inject(CookieService)

  isMenuShowing = false

  toggleMenu() {
    this.isMenuShowing = !this.isMenuShowing
  }
  
  home() {
    this._router.navigateByUrl('').then(() => window.location.reload())
  }

  logout() {
    this._cookie.delete('token')
    this._cookie.delete('email')
    this._router.navigateByUrl('/login')
  }

  plan() {
    this._router.navigateByUrl('/plan').then(() => window.location.reload())
  }
}
