import { Customer } from "./customer";
import { Driver } from "./driver";

export class Delivery {
    id?:string;
    trackNumber!: string;
    status!: DeliveryStatus;
    departureDate! :Date ;
    arrivalDate!: Date ;
    actualArrivalDate!: Date ;

    originAddress!: String ;
    destinationAddress! : String ;
    currentLocation! : String ;

    weight!: number ;
    price! : number ;

    
    // recipient! : Customer ;

    // assignedDriver!: Driver ;
}

export enum DeliveryStatus {
    RETURNED = 'RETURNED',
    EN_COURS = 'In Transit',
    LIVRÉE = 'Delivered',
    ANNULÉ = 'Cancelled'
  }
  