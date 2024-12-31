import { Component } from '@angular/core';
import { Customer } from '../../../../entities/customer';
import { CustomerService } from '../../../../services/customer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrl: './list-customer.component.scss'
})
export class ListCustomerComponent {


  AllCustomers: Customer[] = [];
  loading: boolean = true;

  id!:string;
  constructor(
    private customerService: CustomerService,
    private toastr: ToastrService

  ) {}
  
  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.customerService.getAllCustomer().subscribe(
      data => {
        this.AllCustomers = data;
        this.loading = false;  // Hide loading spinner once data is fetched
        console.log(this.AllCustomers);  // Log to check if data is loaded

      },
      error => {
        console.error(error);
        this.loading = false;  // Hide loading spinner even if there is an error
      }
    );
  }

  

  
  deleteCustomer(id: string) {
    this.customerService.deleteCustomer(id).subscribe(
      data => {
        console.log(data);
        this.getAllCustomers();
      },
      error => {
        console.error(error);
        if(error.status == 200)
        this.toastr.success(error.error.text);
        if(error.status == 400)
        this.toastr.error(error.error);
        this.getAllCustomers();
      }
    );
  }
}
