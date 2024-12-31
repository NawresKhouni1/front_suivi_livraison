import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverRoutingModule } from './driver-routing.module';
import { ListDriverComponent } from './list-driver/list-driver.component';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListDriverComponent
  ],
  imports: [
    CommonModule,
    DriverRoutingModule,
    TableModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class DriverModule { }
