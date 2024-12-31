import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AppLayoutComponent } from '../layout/app.layout.component';

const routes: Routes = [
  {
    path:'', component: AppLayoutComponent,
    children: [
      { path: 'driver', loadChildren: () => import('./modules/driver/driver.module').then( m => m.DriverModule)},
      { path: 'customer', loadChildren: () => import('./modules/customer/customer.module').then( m => m.CustomerModule)},
      { path: 'delivery', loadChildren: () => import('./modules/delivery/delivery.module').then( m => m.DeliveryModule)},
      { path: 'truck', loadChildren: () => import('./modules/truck/truck.module').then( m => m.TruckModule)},
      // { path: 'blockchain', loadChildren: () => import('./modules/blockchain/blockchain.module').then( m => m.BlockchainModule)},

  ]
    // component: AdminComponent,
    // children: [
    //   { path:'', component: AdminDashboardComponent}
    // ]
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
