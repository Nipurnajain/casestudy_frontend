import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private router: Router) {}

  logout(): void {
    // Perform logout logic, e.g., clear authentication information

    // Redirect to the login page
    this.router.navigate(['/admin-login']);
  }


}
