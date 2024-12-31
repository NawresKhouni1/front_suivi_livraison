import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Truck, TruckStatus, TruckType } from '../../../../entities/truck';
import { TruckService } from '../../../../services/truck.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Driver } from '../../../../entities/driver';
import { DriverService } from '../../../../services/driver.service';

@Component({
  selector: 'app-add-truck',
  templateUrl: './add-truck.component.html',
  styleUrl: './add-truck.component.scss'
})
export class AddTruckComponent {

  validateForm = new FormGroup({

    truckNumber: new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
    licensePlate: new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
    type: new FormControl(TruckType.CAMION, Validators.required), // Enum initial value
    status: new FormControl(TruckStatus.DISPONIBLE, Validators.required), // Enum initial value
    // driverId: new FormControl('', Validators.required), // Enum initial value

});
  truck: Truck = new Truck();
  isDisabled: boolean = false;
  Drivers: any[] = [];
  truckStatusList = Object.keys(TruckStatus).filter(key => isNaN(Number(key))); // Get enum keys (excluding numeric values)
  truckTypeList = Object.keys(TruckType).filter(key => isNaN(Number(key))); // Get enum keys (excluding numeric values)
  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private truckService : TruckService,
    private driverService: DriverService,
    private router: Router,
    private toastr : ToastrService,
    ) { }
  
    ngOnInit(): void {
      // Load the recipients and drivers when the component initializes
      this.loadDrivers();
    }
    loadDrivers() {
      this.driverService.getAllDriver().subscribe((data) => {
        this.Drivers = data;
      });
    }
    
  
    markControlsAsTouched(formGroup: FormGroup): void {
      Object.values(formGroup.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  
  
    add(){
      this.markControlsAsTouched(this.validateForm);
      this.isDisabled = true;
     
      if (this.validateForm.valid) {
      this.truck = {
        truckNumber : this.truck.truckNumber = this.validateForm.value.truckNumber || '',
        type: this.validateForm.value.type || TruckType.CAMION,
        licensePlate : this.truck.licensePlate = this.validateForm.value.licensePlate  || '',
        status: this.validateForm.value.status || TruckStatus.DISPONIBLE,
        // drivers: { id: this.validateForm.value.driverId } as Driver,
        };
  
        console.log('Form is valid. Submitting delivery...', this.truck);

        // Call the delivery service to add the new delivery
        this.truckService.addtruck(this.truck).subscribe(
          () => {
            this.toastr.success("Delivery created successfully!");
            this.router.navigate(['/truck/list']);
          },
          error => {
            this.toastr.error(error.error || "Failed to create truck", "Error");
            console.error(error);
          }
        );
      } else {
        this.toastr.info('Please fill out all required fields!');
      }
  
      // Reactivate the button after the request
      this.isDisabled = false;
    }
  
  }