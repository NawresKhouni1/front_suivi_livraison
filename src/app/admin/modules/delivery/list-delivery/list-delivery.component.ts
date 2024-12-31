import { Component } from '@angular/core';
import { Delivery } from '../../../../entities/delivery';
import { DeliveryService } from '../../../../services/delivery.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-delivery',
  templateUrl: './list-delivery.component.html',
  styleUrl: './list-delivery.component.scss'
})
export class ListDeliveryComponent {

  AllDeliveries: Delivery[] = [];
  loading: boolean = true;

  id!:string;
  constructor(
    private deliveryService: DeliveryService,
    private toastr: ToastrService

  ) {}
  
  ngOnInit(): void {
    this.getAllDeliveries();
  }

  getAllDeliveries() {
    this.deliveryService.getAllDeliveries().subscribe(
      data => {
        this.AllDeliveries = data;
        this.loading = false;  // Hide loading spinner once data is fetched
        console.log(this.AllDeliveries);  // Log to check if data is loaded

      },
      error => {
        console.error(error);
        this.loading = false;  // Hide loading spinner even if there is an error
      }
    );
  }

  

  
  deleteDelivery(id: string) {
    this.deliveryService.deleteDeliveries(id).subscribe(
      data => {
        console.log(data);
        this.getAllDeliveries();
      },
      error => {
        console.error(error);
        if(error.status == 200)
        this.toastr.success(error.error.text);
        if(error.status == 400)
        this.toastr.error(error.error);
        this.getAllDeliveries();
      }
    );
  }
}
