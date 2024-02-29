import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtClientAdminService } from 'src/app/jwt-client-admin.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private router: Router,private jwtAdminService:JwtClientAdminService) {}

  logout(): void {

    this.jwtAdminService.clearStoredToken();
    // Redirect to the login page
    this.router.navigate(['/admin-login']);
  }
  


  

}
