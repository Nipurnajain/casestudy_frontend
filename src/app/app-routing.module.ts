import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterManagerComponent } from './adminDashboard/register-manager/register-manager.component';
import { DashboardComponent } from './adminDashboard/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'register-manager', component: RegisterManagerComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
