import { Component } from '@angular/core';
import { Restaurant } from '../Restaurant';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-display-restaurants',
  templateUrl: './display-restaurants.component.html',
  styleUrls: ['./display-restaurants.component.css']
})
export class DisplayRestaurantsComponent {

  restaurantList:Restaurant[] = [];

  constructor(private adminService: AdminService) { 
    
  }

  ngOnInit(): void {
    this.getAllRestaurants();
  }

  getAllRestaurants(){
    this.adminService.getRestaurants().subscribe( 
                                    (list)=>{ this.restaurantList = list;  
                                      console.log(list)}
                                    
                                      );

  }

  removeRestaurant(resid:number){
    this.adminService.deleteRestaurant(resid).subscribe((msg)=>{ console.log("Deleted "+msg);});
    this.getAllRestaurants();

  }





        



}
