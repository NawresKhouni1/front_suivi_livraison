import { Component } from '@angular/core';
import { Truck } from '../../../../entities/truck';
import { TruckService } from '../../../../services/truck.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail-truck',
  templateUrl: './detail-truck.component.html',
  styleUrl: './detail-truck.component.scss'
})
export class DetailTruckComponent {

  truck!: Truck;
  idTruck!: string;
  message!: string;
  constructor(private truckService: TruckService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.idTruck = params['id']);
    this.getTruckById(this.idTruck);
  }

  getTruckById(id: string) {
    this.truckService.getTruckById(id).subscribe(data => {
      this.truck = data;
    }, error => {
      console.error(error);
    });
  }
}
