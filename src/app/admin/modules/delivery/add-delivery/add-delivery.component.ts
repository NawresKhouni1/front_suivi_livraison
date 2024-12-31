import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Delivery, DeliveryStatus } from '../../../../entities/delivery';
import { DeliveryService } from '../../../../services/delivery.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrl: './add-delivery.component.scss'
})
export class AddDeliveryComponent  {

  deliveryForm!: FormGroup;
  deliveryStatusList = Object.keys(DeliveryStatus).filter(key => isNaN(Number(key))); // Get enum keys (excluding numeric values)

  isDisabled: boolean = false;

  // Form group initialization
  validateForm = new FormGroup({
    trackNumber: new FormControl('', [Validators.required, Validators.minLength(5)]),
    status: new FormControl(DeliveryStatus.EN_COURS, Validators.required), // Enum initial value
    departureDate: new FormControl('', Validators.required),
    arrivalDate: new FormControl('', Validators.required),
    actualArrivalDate: new FormControl('', Validators.required),
    originAddress: new FormControl('', [Validators.required, Validators.minLength(5)]),
    destinationAddress: new FormControl('', [Validators.required, Validators.minLength(5)]),
    currentLocation: new FormControl('', [Validators.required, Validators.minLength(5)]),
    weight: new FormControl(0, [Validators.required, Validators.min(1)]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
   
  });

  delivery: Delivery = new Delivery();

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private deliveryService: DeliveryService,
    private router: Router,
    private toastr: ToastrService,
 
  ) { }

 

  // Mark all controls as touched to trigger validation
  markControlsAsTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }


  add(): void {
    this.markControlsAsTouched(this.validateForm);
    this.isDisabled = true;
    this.delivery.trackNumber= this.validateForm.value.trackNumber || '',
    this.delivery.status= this.validateForm.value.status || DeliveryStatus.EN_COURS,
    this.delivery.departureDate= this.validateForm.value.departureDate ? new Date(this.validateForm.value.departureDate) : new Date(),
    this.delivery.arrivalDate= this.validateForm.value.arrivalDate ? new Date(this.validateForm.value.arrivalDate) : new Date(),
    this.delivery.actualArrivalDate= this.validateForm.value.actualArrivalDate ? new Date(this.validateForm.value.actualArrivalDate) : new Date(),
    this.delivery.originAddress= this.validateForm.value.originAddress || '',
    this.delivery.destinationAddress= this.validateForm.value.destinationAddress || '',
    this.delivery.currentLocation= this.validateForm.value.currentLocation || '',
    this.delivery.weight= this.validateForm.value.weight || 0,
    this.delivery.price= this.validateForm.value.price || 0,


      console.log('Form is valid. Submitting delivery...', this.delivery);
      if (this.validateForm.valid) {
        console.log(this.delivery);
        this.deliveryService.addDelivery(this.delivery).subscribe((resp : any) => {
          console.log(resp);
          
          this.toastr.success("",'delivery created successfully !');
          this.router.navigate(['/delivery/list']);
        }, error => {
          this.toastr.error(error.error,'Impossible to  create a delivery!');
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
