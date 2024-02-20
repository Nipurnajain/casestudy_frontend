import { Component } from '@angular/core';

import { Manager } from '../Manager';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-display-managers',
  templateUrl: './display-managers.component.html',
  styleUrls: ['./display-managers.component.css']
})
export class DisplayManagersComponent {

  managerList:Manager[] = [];

  constructor(private adminService: AdminService) { 
    
  }

  ngOnInit(): void {
    this.getAllManagers();
  }

  getAllManagers(){
    this.adminService.getManagers().subscribe( 
                                    (list)=>{ this.managerList = list;  
                                      console.log(list)}
                                    
                                      );

  }

  removeManager(mid:number){
    this.adminService.deleteManager(mid).subscribe((msg)=>{ console.log("Deleted "+msg);});
    this.getAllManagers();

  }

}
