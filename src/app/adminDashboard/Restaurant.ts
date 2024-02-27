import { MenuItem } from "../managerDashboard/MenuItem";

export interface Restaurant{
    imageUrl: string;
    restaurantId:number ;
    name:string;
    location:string;
    contactNumber:string;
    rating:number;
    menuItemSet: MenuItem[];
    
}