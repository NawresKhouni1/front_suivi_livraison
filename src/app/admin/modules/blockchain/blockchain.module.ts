import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { BlockchainComponent } from './blockchain.component';
import { BlockchainRoutingModule } from './blockchain-routing.module';
@NgModule({
  declarations: [
    BlockchainComponent,
    
  ],
  imports: [
    CommonModule,
    BlockchainRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    TableModule
  ]
})
export class BlockchainModule { }
