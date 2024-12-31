import { Component } from '@angular/core';
import { Customer } from '../../../../entities/customer';
import { CustomerService } from '../../../../services/customer.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrl: './detail-customer.component.scss'
})
export class DetailCustomerComponent {


  customer!: Customer;
  idCustomer!: string;
  message!: string;
  constructor(private customerService: CustomerService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.idCustomer = params['id']);
    this.getCustomerById(this.idCustomer);
  }

  getCustomerById(id: string) {
    this.customerService.getCustomerById(id).subscribe(data => {
      this.customer = data;
    }, error => {
      console.error(error);
    });
  }
}
