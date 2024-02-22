import { Component } from '@angular/core';

import { Discount } from '../Discount';
import { AdminService } from '../admin.service';


@Component({
  selector: 'app-display-discount',
  templateUrl: './display-discount.component.html',
  styleUrls: ['./display-discount.component.css']
})
export class DisplayDiscountComponent {


  discountList:Discount[] = [];

  constructor(private adminService: AdminService) { 
    
  }

  ngOnInit(): void {
    this.getAllDiscounts();
  }

  getAllDiscounts(){
    this.adminService.getDiscounts().subscribe( 
                                    (list)=>{ this. discountList = list;  
                                      console.log(list)}
                                    
                                      );

  }

  removeDiscount(discountid:number){
    this.adminService.removeDiscount(discountid).subscribe((msg)=>{ console.log("Deleted "+msg);});
    this.getAllDiscounts();

  }


}
