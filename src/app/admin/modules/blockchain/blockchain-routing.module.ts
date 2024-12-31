import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockchainComponent } from './blockchain.component';

const routes: Routes = [
  {
    path: 'blockchain',
    component: BlockchainComponent,
    data: {
      title: 'Créer blockchain'
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlockchainRoutingModule { }
