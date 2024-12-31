import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  signupForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', [Validators.required]),
    password: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(40), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]),

  });  // Explicitly cast to the SignupForm type
  

  constructor(private auth: AuthService, private router: Router, private toastr : ToastrService) {}

  isDisabled = false;

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.auth.isLoggedIn().subscribe((loggedIn) => {
        if (loggedIn) {
          console.log("User is logged in, navigating to admin");
          // this.router.navigate(['admin']);
        }
      });
    }
  }

  markControlsAsTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
  onSubmit(): void {
    this.markControlsAsTouched(this.signupForm);
    this.isDisabled = true;
  
    // Ensure roles are set
    if (!this.signupForm.value.role || this.signupForm.value.role.length === 0) {
      this.signupForm.patchValue({ role: ['USER'] }); // Default role as an array
    }
  
    console.log('Form values:', this.signupForm.value);
  
    if (this.signupForm.valid) {
      console.log(this.signupForm);

      const newUser = { ...this.signupForm.value };
  
      this.auth.signup(newUser).subscribe(
        (result) => {
          console.log("signup : "+result);
          this.router.navigate(['/login']);
          this.toastr.success(result.msg);
        },
        (errorResponse) => {
          this.toastr.error(errorResponse.error.msg);
          console.error(errorResponse);
          this.isDisabled = false;
        }
      );
    } else {
      this.toastr.info('Please fill all the fields');
      this.isDisabled = false;
    }
  }


  
  
}


