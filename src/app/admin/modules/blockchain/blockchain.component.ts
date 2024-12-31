import { Component, OnInit } from '@angular/core';
import { BlockchainService } from '../../../services/blockchain.service';

@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrl: './blockchain.component.scss'
})

  export class BlockchainComponent implements OnInit {
    accounts: string[] = [];
    balances: { [key: string]: string } = {};
  
    constructor(private blockchainService: BlockchainService) {}
  
    async ngOnInit() {
      // Récupérer les comptes Ganache
      // this.accounts = await this.blockchainService.getAccounts();
  
      // Récupérer le solde de chaque compte
      for (let account of this.accounts) {
        this.balances[account] = await this.blockchainService.getBalance(account);
      }
    }
  }
