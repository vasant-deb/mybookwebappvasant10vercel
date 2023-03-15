import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent {
  raiseRequestForm: FormGroup;
  requests: any[] = [];

  constructor(private fb: FormBuilder,private authService: AuthService) {
    this.raiseRequestForm = this.fb.group({
      requestTitle: ['', Validators.required],
      requestDetails: ['', Validators.required]
    });
    this.getRequests();
  }

  logout() {
    this.authService.logout();
  }
  onRaiseRequest() {
    const title = this.raiseRequestForm.controls['requestTitle'].value;
    const details = this.raiseRequestForm.controls['requestDetails'].value;
    const customerId = localStorage.getItem('access_token');
    if(customerId){
    this.authService.createRequest({ title, details, customerId }).subscribe((response) => {
      if (response.error===false) {
        this.getRequests(); // Refresh the list of requests on successful creation
        this.raiseRequestForm.reset();
      } else {
        alert(response.message);
      }
    });
  }
  }

  getRequests() {
    const customerId = localStorage.getItem('access_token');
    if(customerId){
    this.authService.getRequestsByCustomerId({customerId}).subscribe((response) => {
      if (response.error===false) {
        this.requests = response.stats;
      } else {
        alert(response.message);
      }
    });
  }
  }
}
