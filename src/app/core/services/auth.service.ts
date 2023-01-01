import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}

  /**
   * this simple function created for login user
   * @param {data} username and password
   * @returns user loggedin
   */
  loginUser(username: string, password: string): Observable<any> {
    return this.http.post('/users/login', {
      username,
      password,
    });
  }

  /**
   * this simple function created for register user
   * @param {data} username and password
   * @returns user registered to system
   */
  registerUser(username: string, password: string): Observable<any> {
    return this.http.post('/users/register', {
      username,
      password,
    });
  }
}
