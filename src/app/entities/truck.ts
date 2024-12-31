import { Driver } from "./driver";


export class Truck {
    id?:string;
   
    truckNumber!: String ;
    type!: TruckType ;
    licensePlate!: String ;

    status!: TruckStatus ;
}

export enum TruckType {
    VAN,     
    CAMION,   
    SCOOTER   
  }
  

  export enum TruckStatus {
    DISPONIBLE,    // Available
    EN_ROUTE,      // On the way
    MAINTENANCE    // Under maintenance  
  }