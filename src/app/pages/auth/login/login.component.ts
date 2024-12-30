// login.component.ts
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const credentials = {
        username: this.form.get('username')?.value?.trim(),
        password: this.form.get('password')?.value?.trim()
      };

      this.authService.login(credentials).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Login error details:', error);

          if (error instanceof SyntaxError) {
            this.errorMessage = 'API returned an invalid response. Please try again later.';
          } else if (error.status === 403) {
            this.errorMessage = 'Access denied. Please check your credentials.';
          } else if (error.status === 401) {
            this.errorMessage = 'Invalid username or password';
          } else {
            this.errorMessage = 'An error occurred during login. Please try again.';
          }
        }
      });
    } else {
      this.markFormFieldsAsTouched();
    }
  }

  private markFormFieldsAsTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      control?.markAsTouched();
    });
  }

  get username() { return this.form.get('username'); }
  get password() { return this.form.get('password'); }
}