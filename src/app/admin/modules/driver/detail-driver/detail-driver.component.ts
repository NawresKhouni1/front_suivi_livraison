import { Component } from '@angular/core';
import { DriverService } from '../../../../services/driver.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Driver } from '../../../../entities/driver';

@Component({
  selector: 'app-detail-driver',
  templateUrl: './detail-driver.component.html',
  styleUrl: './detail-driver.component.scss'
})
export class DetailDriverComponent {


  driver!: Driver;
  idDriver!: string;
  message!: string;
  constructor(private driverService: DriverService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.idDriver = params['id']);
    this.getDriverById(this.idDriver);
  }

  getDriverById(id: string) {
    this.driverService.getDriverById(id).subscribe(data => {
      this.driver = data;
    }, error => {
      console.error(error);
    });
  }
}
