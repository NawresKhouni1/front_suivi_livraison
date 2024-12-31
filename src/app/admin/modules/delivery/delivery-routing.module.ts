import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDeliveryComponent } from './list-delivery/list-delivery.component';
import { DetailDeliveryComponent } from './detail-delivery/detail-delivery.component';
import { EditDeliveryComponent } from './edit-delivery/edit-delivery.component';
import { AddDeliveryComponent } from './add-delivery/add-delivery.component';

const routes: Routes = [
  {
    path: 'add',
    component: AddDeliveryComponent,
    data: {
      title: 'Créer un livraison'
    }
  },
  {
    path: 'list',
    component: ListDeliveryComponent,
    data: {
      title: 'liste des livraisons'
    }
  }, 
  {
    path: 'detail/:id',
    component: DetailDeliveryComponent,
    data: {
      title: 'Detail livraison'
    }
  },
  {
    path: 'edit/:id',
    component: EditDeliveryComponent,
    data: {
      title: 'Edit livraison'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryRoutingModule { }
