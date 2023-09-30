import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  _router : Router = inject(Router)
  
  home() {
    this._router.navigateByUrl('').then(() => window.location.reload())
  }

  logout() {
    localStorage.clear()
    this._router.navigateByUrl('/login')
  }
}
