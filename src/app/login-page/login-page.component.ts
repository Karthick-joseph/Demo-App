import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service'; // Adjust the import path as necessary

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  username = '';
  password = '';

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.authService.login(this.username, this.password)) {
        this.router.navigate(['/home']);
      } else {
        alert('Invalid username or password');
      }
    }
  }
}


