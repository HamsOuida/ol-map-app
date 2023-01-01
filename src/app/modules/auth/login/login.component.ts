import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  /** login form */
  loginForm!: FormGroup;

  /** authenticate error */
  error!: any;

  /** form submitted */
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  /**
   * this simple function created for authenticate user
   * @param {string} username and password
   * @returns user registered to system
   */
  authenticate(status?: string) {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const formValue = this.loginForm.value;
    if (status && status === 'new') {
      this.authService
        .registerUser(formValue.username, formValue.password)
        .subscribe({
          next: (res) => {
            this.submitted = false;
            this.onSuccessResponse();
          },
          error: (err) => {
            this.error = err.error;
          },
        });
    } else {
      this.authService
        .loginUser(formValue.username, formValue.password)
        .subscribe({
          next: (res) => {
            this.onSuccessResponse();
          },
          error: (err) => {
            this.error = err.error;
          },
        });
    }
  }

  /**
   * this simple function created for handle success response of authentication
   * @returns user logged in and navigating to home page
   */
  onSuccessResponse() {
    localStorage.setItem('token', 'user Logged in successfully');
    if (this.loginForm.value.rememberMe) {
      localStorage.setItem('rememberMe', 'true');
    }
    this.router.navigate(['/']);
  }
}
