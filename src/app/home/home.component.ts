import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Adjust the import path as necessary
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout(); 
    this.router.navigate(['/login']);
  }
}
