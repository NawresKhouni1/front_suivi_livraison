import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { DetailCustomerComponent } from './detail-customer/detail-customer.component';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';

const routes: Routes = [
  {
    path: 'add',
    component: AddCustomerComponent,
    data: {
      title: 'Créer customer'
    }
  },
  {
    path: 'list',
    component: ListCustomerComponent,
    data: {
      title: 'liste des customers'
    }
  }, 
  {
    path: 'detail/:id',
    component: DetailCustomerComponent,
    data: {
      title: 'Detail customer'
    }
  },
  {
    path: 'edit/:id',
    component: EditCustomerComponent,
    data: {
      title: 'Edit customer'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
