import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error: string='';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    if (!this.loginForm.valid || !email.trim() || !password.trim()) {
      this.error = 'Please enter a valid email and password';
      return;
    }
   

   
    this.authService.login({ email, password }).subscribe(           
      result => {
        if (result.error==false) {
          if(result.role==='customer'){
            const token = result.token;
            localStorage.setItem('access_token',token );
            localStorage.setItem('userType','customer' );
            this.router.navigate(['/customer-dashboard']);
          }
          if(result.role==='expert'){
            const token = result.token;
            localStorage.setItem('access_token',token );
            localStorage.setItem('userType','expert' );
            this.router.navigate(['/expert-dashboard']);
          }
        } else {
          this.error = result.message;
        }
      },
      error => {
        this.error = 'An error occurred while logging in: ' + error.message;
      }
    );
    
  } 
}
