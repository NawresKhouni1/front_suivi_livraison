import { Component, ElementRef, ViewChild } from '@angular/core';
import { Driver } from '../../../../entities/driver';
import { DriverService } from '../../../../services/driver.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Truck } from '../../../../entities/truck';
import { Delivery } from '../../../../entities/delivery';
import { TruckService } from '../../../../services/truck.service';
import { DeliveryService } from '../../../../services/delivery.service';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrl: './add-driver.component.scss'
})
export class AddDriverComponent {
  validateForm = new FormGroup({

    name: new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
    licenseNumber: new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
    phone: new FormControl('',[Validators.required, Validators.maxLength(50)]),
    availability: new FormControl(false, [Validators.required]), // Ensuring default is false
    // truckId: new FormControl('', [Validators.required]),
    // deliveryId: new FormControl('', [Validators.required])
});
  driver: Driver = new Driver();
  isDisabled: boolean = false;
  trucks: Truck[] = []; 
  deliveries: Delivery[] = []; 
  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private driverService : DriverService,
    private truckService: TruckService,
    private deliveryService: DeliveryService,
    private router: Router,
    private toastr : ToastrService,
    ) { }
  
    
  
    ngOnInit(): void {
      // Load the recipients and drivers when the component initializes
      this.loadTrucks();
      this.loadDeliveries();
    }
  
    loadTrucks() {
      this.truckService.getAlltrucks().subscribe((data) => {
        this.trucks = data;
      });
    }
  
    loadDeliveries() {
      this.deliveryService.getAllDeliveries().subscribe((data) => {
        this.deliveries = data;
      });
    }  
    markControlsAsTouched(formGroup: FormGroup): void {
      Object.values(formGroup.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  
  
    add(){
      this.markControlsAsTouched(this.validateForm);
      //disable the button during the request
      this.isDisabled = true;
      this.driver.name = this.validateForm.value.name || '';
      this.driver.licenseNumber = this.validateForm.value.licenseNumber || '';
      this.driver.phone = this.validateForm.value.phone  || '';
      this.driver.availability = this.validateForm.value.availability === null || this.validateForm.value.availability === undefined 
      ? false 
      : this.validateForm.value.availability;
  
      // Assigner le véhicules sélectionné
      // const truckId = this.validateForm.value.truckId;
      // if (truckId) {
      //   this.driver.truck = { id: truckId } as Truck; // Associe uniquement l'ID du camion
      // }
      // const deliveryId = this.validateForm.value.deliveryId;
      // if (deliveryId) {
      //   this.driver.delivery = { id: deliveryId } as Delivery; 
      // }
        console.log(this.validateForm.value);
        if (this.validateForm.valid) {
          console.log(this.driver);
          this.driverService.addDriver(this.driver).subscribe((resp : any) => {
            console.log(resp);
            this.toastr.success("",'Driver created successfully !');
            this.router.navigate(['/driver/list']);
          }, error => {
            this.toastr.error(error.error,'Impossible to  create a driver!');
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
  