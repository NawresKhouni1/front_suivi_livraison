import { Component } from '@angular/core';
import { Delivery } from '../../../../entities/delivery';
import { DeliveryService } from '../../../../services/delivery.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail-delivery',
  templateUrl: './detail-delivery.component.html',
  styleUrl: './detail-delivery.component.scss'
})
export class DetailDeliveryComponent {


  delivery!: Delivery;
  idDelivery!: string;
  message!: string;
  constructor(private deliveryService: DeliveryService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.idDelivery = params['id']);
    this.getDeliveryById(this.idDelivery);
  }

  getDeliveryById(id: string) {
    this.deliveryService.getDeliveryById(id).subscribe(data => {
      this.delivery = data;
    }, error => {
      console.error(error);
    });
  }
}
