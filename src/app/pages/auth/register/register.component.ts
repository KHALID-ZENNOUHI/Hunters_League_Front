import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import e from 'express';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: FormGroup;
  errorMessage: string = '';
    constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
      this.form = this.fb.group({
        username: new FormControl('', [Validators.required, Validators.minLength(6)]),
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        cin: new FormControl('', [Validators.required]),
        nationality: new FormControl('', [Validators.required])
      });
    }
  
    onSubmit() {
      if (this.form.valid) {
        this.authService.register(this.form.value).subscribe({
          next: () => {
            this.router.navigate(['login']);
          },
          error: (error: any) => {
            this.errorMessage = '';
            if (error.error) {
              const backendErrors = error.error;
              Object.keys(backendErrors).forEach(key => {
                this.errorMessage += `${key}: ${backendErrors[key]}\n`;
              });
            } else {
              this.errorMessage = 'Registration failed';
            }
          },
        });
      }
    }
}
