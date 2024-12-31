import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
  UserDashboardComponent  
],
  imports: [
    CommonModule,
UserRoutingModule  ]
})
export class UserModule { }
