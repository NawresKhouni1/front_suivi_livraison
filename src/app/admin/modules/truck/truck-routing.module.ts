import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTruckComponent } from './add-truck/add-truck.component';
import { ListTruckComponent } from './list-truck/list-truck.component';
import { DetailTruckComponent } from './detail-truck/detail-truck.component';
import { EditTruckComponent } from './edit-truck/edit-truck.component';

const routes: Routes = [
  {
    path: 'add',
    component: AddTruckComponent,
    data: {
      title: 'Créer véhicule'
    }
  },
  {
    path: 'list',
    component: ListTruckComponent,
    data: {
      title: 'liste des véhicules'
    }
  }, 
  {
    path: 'detail/:id',
    component: DetailTruckComponent,
    data: {
      title: 'Detail véhicule'
    }
  },
  {
    path: 'edit/:id',
    component: EditTruckComponent,
    data: {
      title: 'Edit véhicule'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TruckRoutingModule { }
