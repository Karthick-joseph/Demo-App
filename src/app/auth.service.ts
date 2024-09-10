import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false; // Default to not logged in

  constructor() {
    this.checkLoginStatus(); // Check login status on initialization
  }

  private checkLoginStatus() {
    // Optionally check local storage for an authentication token or flag
    const token = localStorage.getItem('authToken');
    if (token) {
      this.loggedIn = true; // Set loggedIn to true if a token exists
    }
  }

  login(username: string, password: string): boolean {
    // Simple hardcoded authentication for example purposes
    if (username === 'admin' && password === '121212') {
      this.loggedIn = true;
      localStorage.setItem('authToken', 'yourAuthToken'); // Save token to local storage
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('authToken'); // Remove token on logout
  }

  public isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
