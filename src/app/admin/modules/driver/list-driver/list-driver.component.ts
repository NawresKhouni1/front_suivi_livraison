import { Component } from '@angular/core';
import { Driver } from '../../../../entities/driver';
import { DriverService } from '../../../../services/driver.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-driver',
  templateUrl: './list-driver.component.html',
  styleUrl: './list-driver.component.scss'
})
export class ListDriverComponent {

  AllDrivers: Driver[] = [];
  loading: boolean = true;

  id!:string;
  constructor(
    private driverService: DriverService,
    private toastr: ToastrService

  ) {}
  
  ngOnInit(): void {
    this.getAllDrivers();
  }

  getAllDrivers() {
    this.driverService.getAllDriver().subscribe(
      data => {
        this.AllDrivers = data;
        this.loading = false;  // Hide loading spinner once data is fetched
        console.log(this.AllDrivers);  // Log to check if data is loaded

      },
      error => {
        console.error(error);
        this.loading = false;  // Hide loading spinner even if there is an error
      }
    );
  }

  

  
  deleteDriver(id: string) {
    this.driverService.deleteDrivers(id).subscribe(
      data => {
        console.log(data);
        this.getAllDrivers();
      },
      error => {
        console.error(error);
        if(error.status == 200)
        this.toastr.success(error.error.text);
        if(error.status == 400)
        this.toastr.error(error.error);
        this.getAllDrivers();
      }
    );
  }
}
