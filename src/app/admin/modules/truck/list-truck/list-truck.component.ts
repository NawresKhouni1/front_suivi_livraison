import { Component } from '@angular/core';
import { Truck } from '../../../../entities/truck';
import { TruckService } from '../../../../services/truck.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-truck',
  templateUrl: './list-truck.component.html',
  styleUrl: './list-truck.component.scss'
})
export class ListTruckComponent {


  AllTruckes: Truck[] = [];
  loading: boolean = true;

  id!:string;
  constructor(
    private truckService: TruckService,
    private toastr: ToastrService

  ) {}
  
  ngOnInit(): void {
    this.getAllTruckes();
  }

  getAllTruckes() {
    this.truckService.getAlltrucks().subscribe(
      data => {
        this.AllTruckes = data;
        this.loading = false;  // Hide loading spinner once data is fetched
        console.log(this.AllTruckes);  // Log to check if data is loaded

      },
      error => {
        console.error(error);
        this.loading = false;  // Hide loading spinner even if there is an error
      }
    );
  }

  

  
  deleteTrucks(id: string) {
    this.truckService.deleteTrucks(id).subscribe(
      data => {
        console.log(data);
        this.getAllTruckes();
      },
      error => {
        console.error(error);
        if(error.status == 200)
        this.toastr.success(error.error.text);
        if(error.status == 400)
        this.toastr.error(error.error);
        this.getAllTruckes();
      }
    );
  }
}
