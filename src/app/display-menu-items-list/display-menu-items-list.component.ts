import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { JwtClientService } from '../jwt-client.service';

@Component({
  selector: 'app-display-menu-items-list',
  templateUrl: './display-menu-items-list.component.html',
  styleUrls: ['./display-menu-items-list.component.css']
})
export class DisplayMenuItemsListComponent {
  restaurantId!: number;
  menuItems: any[] = [];
  searchMenu: string = '';

  constructor(private route: ActivatedRoute, private customerService: CustomerService,private jwtClientService :JwtClientService
    ,private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.restaurantId = params['restaurantId'];
      this.fetchMenuItems();
    });
  }

  fetchMenuItems() {
    // Fetch menu items based on the restaurantId
    this.customerService.getMenuItemsByRestaurantId(this.restaurantId).subscribe(
      (response) => {
        this.menuItems = response;

        this.menuItems.forEach(item => {
          item.decodedImage = 'data:image/jpeg;base64,' + item.image; // Assuming default format is JPEG
        });
      },
      (error) => {
        console.error('Error fetching menu items:', error);
      }
    );
  }

  getMenuByKeyword(){
    const keyword = this.searchMenu;
    this.customerService.searchMenuByKeyword(this.restaurantId,keyword)
    .subscribe((list) => {
      this.menuItems= list;

      this.menuItems.forEach(item => {
        item.decodedImage = 'data:image/jpeg;base64,' + item.image; // Assuming default format is JPEG
      });
      console.log(list);
      });
  }

  logout(): void {

    this.jwtClientService.clearStoredToken();
    // Redirect to the login page
    this.router.navigate(['/landing-page']);
  }
}