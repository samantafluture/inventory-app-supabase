import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email!: string | undefined;
  password!: string | undefined;
  message!: string;

  form!: FormGroup;

  constructor(
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }

  login() {
    this.spinner.show();
    this.userService
      .signIn(this.form.get('email')?.value, this.form.get('password')?.value)
      .then((value) => {
        if (value.error) {
          this.message = `Login failed! ${value.error.message}`;
          this.spinner.hide();
        } else {
          localStorage.setItem(
            '@inventory-app:user',
            JSON.stringify(value.user?.email)
          );
          this.router.navigateByUrl('/admin/dashboard/home');
          this.spinner.hide();
        }
      });
  }
}
