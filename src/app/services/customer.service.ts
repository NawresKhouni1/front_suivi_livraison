// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { AuthService } from './auth.service';
// import { Customer } from '../entities/customer';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class CustomerService {

//   private baseUrl = 'http://localhost:8072';

//   constructor(
//     private http: HttpClient,
//     private AuthService: AuthService   ) { }
//   addCustomer(customer: Customer) {

//     console.log('Request URL:', `${this.baseUrl}/admin/api-customers/add-customer`);

//     return this.http.post<Customer>(`${this.baseUrl}/admin/api-customers/add-customer`, customer);
//   }

//   getAllCustomer(): Observable<any> {

    
//     return this.http.get<Customer>(`${this.baseUrl}/admin/api-customers/get-all-customers`);
//   }

//   getCustomerById(id: string): Observable<Customer> {
   
//     return this.http.get<Customer>(`${this.baseUrl}/admin/api-customers/get-customer-by-id/${id}`);
//   }

//   editCustomer(id: string, customer: Customer): Observable<Customer> {
   
//     console.log('Request URL:', `${this.baseUrl}/admin/api-customers/edit-customer/${id}`);
//     console.log('Request Headers:');
//     console.log('Request Body:', customer);
//     return this.http.put<Customer>(`${this.baseUrl}/admin/api-customers/edit-customer/${id}`, customer);
// }


// deleteCustomer(id: string): Observable<any> {
 
//   return this.http.delete<Customer>(`${this.baseUrl}/admin/api-customers/delete-customers/${id}` );
// }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ethers } from 'ethers'; // Import d'Ethers.js
import { contractConfig } from '../../assets/contract-config'; // Fichier ABI et adresse
import { Customer } from '../entities/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private baseUrl = 'http://localhost:8072'; // API backend
  private CustomerContract: ethers.Contract | null = null; // Contrat blockchain, initialisé à null

  constructor(private http: HttpClient) {
    this.initializeContract();
  }

  // Initialisation du contrat blockchain (asynchrone)
  // private async initializeContract(): Promise<void> {
  //   try {
  //     const provider = new ethers.BrowserProvider((window as any).ethereum); // Utilisation de BrowserProvider
  //     const signer = await provider.getSigner(); // Attente du signer
  //     this.CustomerContract = new ethers.Contract(
  //       contractConfig.address,
  //       contractConfig.abi,
  //       signer
  //     );
  //     console.log('Contrat blockchain initialisé.');
  //   } catch (error) {
  //     console.error('Erreur lors de l’initialisation du contrat blockchain :', error);
  //   }
  // }


private async initializeContract(): Promise<void> {
  try {
    if (!ethers.isAddress(contractConfig.address)) {
      throw new Error('Adresse du contrat invalide');
    }
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    this.CustomerContract = new ethers.Contract(
      contractConfig.address,
      contractConfig.abi,
      signer
    );
    console.log('Contrat blockchain initialisé.');
  } catch (error) {
    console.error('Erreur lors de l’initialisation du contrat blockchain :', error);
  }
}

  // ------------------------------
  // Méthodes utilisant l'API Backend
  // ------------------------------

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.baseUrl}/admin/api-customers/add-customer`, customer);
  }

  getAllCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}/admin/api-customers/get-all-customers`);
  }

  getCustomerById(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/admin/api-customers/get-customer-by-id/${id}`);
  }

  editCustomer(id: string, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.baseUrl}/admin/api-customers/edit-customer/${id}`, customer);
  }

  deleteCustomer(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/api-customers/delete-customers/${id}`);
  }

  // ------------------------------
  // Méthodes utilisant la Blockchain
  // ------------------------------
  async addCustomerToBlockchain(customer: Customer): Promise<void> {
    try {
      if (!this.CustomerContract) {
        throw new Error('Le contrat blockchain n’a pas été initialisé.');
      }
  
      console.log('Ajout du client :', customer);
  
      // Envoyer la transaction
      const transaction = await this.CustomerContract['addCustomer'](
        customer.id,
        customer.name,
        customer.address,
        customer.phone,
        customer.email
      );
  
      console.log('Transaction envoyée, hash :', transaction.hash);
  
      // Attendre la confirmation
      const receipt = await transaction.wait();
      console.log('Transaction confirmée :', receipt);
  
      // Affichez les détails de la transaction
      console.log('Bloc :', receipt.blockNumber);
      console.log('Gaz utilisé :', receipt.gasUsed.toString());
      console.log('Événements :', receipt.events);
  
      if (receipt.status === 1) {
        console.log('Transaction réussie sur la blockchain.');
      } else {
        console.error('Transaction échouée sur la blockchain.');
      }
    } catch (error) {
      console.error('Erreur lors de l’ajout du client sur la blockchain :', error);
    }
  }
  
  
  
//   async addCustomerToBlockchain(customer: Customer): Promise<void> {
//   try {
//     if (!this.CustomerContract) {
//       throw new Error('Le contrat blockchain n’a pas été initialisé.');
//     }

//     console.log('Ajout du client :', customer);

//     const transaction = await this.CustomerContract['addCustomer'](
//       customer.id,
//       customer.name,
//       customer.address,
//       customer.phone,
//       customer.email
//     );

//     console.log('Transaction envoyée, hash :', transaction.hash);

//     const receipt = await transaction.wait();
//     console.log('Transaction confirmée sur la blockchain :', receipt);

//   } catch (error) {
//     console.error('Erreur lors de l’ajout du client sur la blockchain :', error);
//     if (error instanceof Error) {
//       console.log('Message de l\'erreur:', error.message);
//       console.log('Stack trace:', error.stack);
//     }
//   }
// }


  async getCustomerFromBlockchain(id: string): Promise<Customer> {
    try {
      if (!this.CustomerContract) {
        throw new Error('Le contrat blockchain n’a pas été initialisé.');
      }
      const customer = await this.CustomerContract['getCustomer'](id);
      return {
        id: customer[0],
        name: customer[1],
        address: customer[2],
        phone: customer[3],
        email: customer[4],
      } as Customer;
    } catch (error) {
      console.error('Erreur lors de la récupération du client sur la blockchain :', error);
      throw error;
    }
  }

  async editCustomerInBlockchain(id: string, customer: Customer): Promise<void> {
    try {
      if (!this.CustomerContract) {
        throw new Error('Le contrat blockchain n’a pas été initialisé.');
      }
      const transaction = await this.CustomerContract['updateCustomer'](
        id,
        customer.name,
        customer.address,
        customer.phone,
        customer.email
      );
      await transaction.wait(); // Attente de confirmation
      console.log('Client modifié sur la blockchain :', transaction.hash);
    } catch (error) {
      console.error('Erreur lors de la modification du client sur la blockchain :', error);
    }
  }

  async deleteCustomerFromBlockchain(id: string): Promise<void> {
    try {
      if (!this.CustomerContract) {
        throw new Error('Le contrat blockchain n’a pas été initialisé.');
      }
      const transaction = await this.CustomerContract['deleteCustomer'](id);
      await transaction.wait(); // Attente de confirmation
      console.log('Client supprimé de la blockchain :', transaction.hash);
    } catch (error) {
      console.error('Erreur lors de la suppression du client sur la blockchain :', error);
    }
  }
}
