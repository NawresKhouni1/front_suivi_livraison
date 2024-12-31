import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DetailDriverComponent } from './modules/driver/detail-driver/detail-driver.component';
import { AddDriverComponent } from './modules/driver/add-driver/add-driver.component';
import { EditDriverComponent } from './modules/driver/edit-driver/edit-driver.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
@NgModule({
  declarations: [
    AdminDashboardComponent,
    DetailDriverComponent,
    AddDriverComponent,
    EditDriverComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CheckboxModule
  ]
})
export class AdminModule { }
