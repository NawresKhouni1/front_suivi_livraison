import { Component, ElementRef, ViewChild } from '@angular/core';
import { Customer } from '../../../../entities/customer';
import { CustomerService } from '../../../../services/customer.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.scss'
})
export class AddCustomerComponent {

  validateForm = new FormGroup({

    name: new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
    address: new FormControl('',[Validators.required, Validators.maxLength(50)]),
    phone: new FormControl('',[Validators.required, Validators.maxLength(50)]),
    email: new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(50)]),


});
  customer: Customer = new Customer();
  isDisabled: boolean = false;

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private customerService : CustomerService,
    private router: Router,
    private toastr : ToastrService,
    ) { }
  
    
  
    
  
    markControlsAsTouched(formGroup: FormGroup): void {
      Object.values(formGroup.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  
  
    add(){
      this.markControlsAsTouched(this.validateForm);
      //disable the button during the request
      this.isDisabled = true;
      this.customer.name = this.validateForm.value.name || '';
      this.customer.address = this.validateForm.value.address || '';
      this.customer.phone = this.validateForm.value.phone  || '';
      this.customer.email = this.validateForm.value.email  || '';

  
        console.log(this.validateForm.value);
        if (this.validateForm.valid) {
          console.log(this.customer);
          this.customerService.addCustomer(this.customer).subscribe((resp : any) => {
            console.log(resp);
            
            this.toastr.success("",'Customer created successfully !');
            this.router.navigate(['/customer/list']);
          }, error => {
            this.toastr.error(error.error,'Impossible to  create a customer!');
            console.error(error);
            //activate the button after the response
            this.isDisabled = false;
          });
        }else{
          this.toastr.info('Please fill out all required fields!');
          //activate the button after the response
          this.isDisabled = false;
        }
    }
  }
  
