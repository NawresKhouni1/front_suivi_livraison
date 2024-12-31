import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TruckRoutingModule } from './truck-routing.module';
import { AddTruckComponent } from './add-truck/add-truck.component';
import { ListTruckComponent } from './list-truck/list-truck.component';
import { DetailTruckComponent } from './detail-truck/detail-truck.component';
import { EditTruckComponent } from './edit-truck/edit-truck.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    AddTruckComponent,
    ListTruckComponent,
    DetailTruckComponent,
    EditTruckComponent
  ],
  imports: [
    CommonModule,
    TruckRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    TableModule
  ]
})
export class TruckModule { }
