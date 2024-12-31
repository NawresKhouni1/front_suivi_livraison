import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  isDisabled = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    console.log('Is Logged In:', this.auth.isLoggedIn());

    if (this.auth.isLoggedIn()) {
      this.router.navigate(['login']);
    }
  }

  markAllAsTouched(formGroup: FormGroup): void {
    formGroup.markAllAsTouched();
  }

  onSubmit(): void {
    this.markAllAsTouched(this.loginForm);
    this.isDisabled = true;

    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')!.value;
      const password = this.loginForm.get('password')!.value;

      this.auth.login({
        email: email,
        password: password
      })
      .pipe(
        finalize(() => {
          this.isDisabled = false;
        })
      )
      .subscribe(
        (result) => {
          console.log(result);
          this.auth.setToken(result.token);
          this.toastr.success(result.msg, 'Success', {
            timeOut: 1000,
          });
          this.router.navigate(['admin']);
        },
        (errorResponse) => {
          this.toastr.error(errorResponse.error.msg);
          console.error(errorResponse);
        }
      );
    } else {
      this.toastr.info('Please fill all the fields');
      this.isDisabled = false;
    }
  }
}