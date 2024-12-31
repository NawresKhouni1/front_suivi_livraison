import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { ListDriverComponent } from './list-driver/list-driver.component';
import { DetailDriverComponent } from './detail-driver/detail-driver.component';
import { EditDriverComponent } from './edit-driver/edit-driver.component';

const routes: Routes = [
  {
    path: 'add',
    component: AddDriverComponent,
    data: {
      title: 'Créer driver'
    }
  },
  {
    path: 'list',
    component: ListDriverComponent,
    data: {
      title: 'liste des livres'
    }
  }, 
  {
    path: 'detail/:id',
    component: DetailDriverComponent,
    data: {
      title: 'Detail driver'
    }
  },
  {
    path: 'edit/:id',
    component: EditDriverComponent,
    data: {
      title: 'Edit driver'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverRoutingModule { }
