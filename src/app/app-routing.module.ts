import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { ExpertDashboardComponent } from './expert-dashboard/expert-dashboard.component';
import { CustomerGuard } from './customer.guard';
import { ExpertGuard } from './expert.guard';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'customer-dashboard', component: CustomerDashboardComponent, canActivate: [CustomerGuard]  },
  { path: 'expert-dashboard', component: ExpertDashboardComponent, canActivate: [ExpertGuard]  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
