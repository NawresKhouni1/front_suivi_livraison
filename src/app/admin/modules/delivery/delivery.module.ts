import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryRoutingModule } from './delivery-routing.module';
import { AddDeliveryComponent } from './add-delivery/add-delivery.component';
import { ListDeliveryComponent } from './list-delivery/list-delivery.component';
import { DetailDeliveryComponent } from './detail-delivery/detail-delivery.component';
import { EditDeliveryComponent } from './edit-delivery/edit-delivery.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule  } from '@angular/forms';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    AddDeliveryComponent,
    ListDeliveryComponent,
    DetailDeliveryComponent,
    EditDeliveryComponent
  ],
  imports: [
    CommonModule,
    DeliveryRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    TableModule,
    
  ]
})
export class DeliveryModule { }
