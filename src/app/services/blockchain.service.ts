import { Injectable } from '@angular/core';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root',
})
export class BlockchainService {
  private web3: Web3;
  private account!: string;

  constructor() {
    // Connexion à Ganache via l'URL RPC
    this.web3 = new Web3('http://127.0.0.1:8545'); // Ganache écoute sur ce port par défaut
  }

  // Récupérer l'adresse du premier compte de Ganache
  async getAccount() {
    const accounts = await this.web3.eth.getAccounts();
    this.account = accounts[0];
    return this.account;
  }

  // Effectuer une transaction
  async sendTransaction(to: string, value: string) {
    await this.web3.eth.sendTransaction({
      from: this.account,
      to: to,
      value: this.web3.utils.toWei(value, 'ether'),
    });
  }

  // Vérifier le solde d'un compte
  async getBalance(account: string) {
    const balance = await this.web3.eth.getBalance(account);
    return this.web3.utils.fromWei(balance, 'ether');
  }
}
