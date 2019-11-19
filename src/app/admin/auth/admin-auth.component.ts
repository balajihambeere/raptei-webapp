import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.scss']
})

export class AdminAuthComponent implements OnInit {
  userForm: FormGroup;
  authType = '';
  title = '';
  isSubmitting = false;
  buttonTitle = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService) { }

  ngOnInit() {
    this.route.url.subscribe(data => {
      this.authType = data[data.length - 1].path;
      this.title = (this.authType === 'login') ? 'Please login..' : 'Please register';
      this.buttonTitle = (this.authType === 'login') ? 'Login' : 'Create Account';
    });

    this.buildForm();
  }

  buildForm() {
    this.userForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email,
      ]],
      password: ['', [
        // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
      ]],
    });
  }

  submitForm() {
    this.isSubmitting = true;
    if (this.authType === 'register') {
      this.auth.emailSignUp(this.userForm.value.email, this.userForm.value.password)
        .then(result => {
          this.router.navigate(['admin/dashboard']);
        });
    } else if (this.authType === 'login') {
      this.auth.emailLogin(this.userForm.value.email, this.userForm.value.password)
        .then(result => {
          this.router.navigate(['admin/dashboard']);
        });
    }
  }
}
