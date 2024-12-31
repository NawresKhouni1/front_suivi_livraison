import { Delivery } from "./delivery";
import { Truck } from "./truck";

export class Driver {
    id!:string;
    name!: string;
    licenseNumber!: string;
    phone!: string;
    availability!: boolean;
    // truck!:Truck;
    // delivery!: Delivery;
}