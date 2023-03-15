import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-expert-dashboard',
  templateUrl: './expert-dashboard.component.html',
  styleUrls: ['./expert-dashboard.component.css']
})
export class ExpertDashboardComponent {
  taskQueue: any[] = [];
  completedTasks: any[] = [];
  selectedStatus: string='';
  statusOptions = [
    { label: 'Pending', value: 'Pending' },
    { label: 'Assigned', value: 'Assigned' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Rejected', value: 'Rejected' }
  ];
  constructor(private authService: AuthService) {
    this.getTasks();
    this.getCompletedTasks();
  }

  logout() {
    this.authService.logout();
  }

  onStatusChange(task: any, status: string) {
    const expertId = localStorage.getItem('access_token');
    console.log(status);
    const requestId=task.id;
    if(expertId){

      this.authService.resolveRequest({ requestId, expertId, status }).subscribe((response) => {
        if (response.error===false) {
         this.getTasks(); // Refresh the list of tasks after updating status
         this.getCompletedTasks();
        } else {
          alert(response.message);
        }
      });
    }
  }

//update hours
updateHours(request: any) {
  const expertId = localStorage.getItem('access_token');
  const requestId = request.id;
  const updatedHours = request.updatedHours;

  if(expertId && requestId && updatedHours) {
    this.authService.updateRequestedHours({ requestId, expertId, requestedHours: updatedHours })
      .subscribe((response) => {
        if (response.error === false) {
        
          this.getTasks();
         
        } else {
          alert(response.message);
        }
      });
  }
}

//end
  getTasks() {
    const expertId = localStorage.getItem('access_token');
    if(expertId){
      this.authService.getTasksByExpertId({ expertId }).subscribe((response) => {
        if (response.error === false) {
          this.taskQueue = response.stats;
        } else {
          alert(response.message);
        }
      });
    }
  }

  getCompletedTasks() {
    const expertId = localStorage.getItem('access_token');
    if(expertId){
      this.authService.getCompletedTasksByExpertId({ expertId }).subscribe((response) => {
        if (response.error === false) {
          this.completedTasks = response.stats;
        } else {
          alert(response.message);
        }
      });
    }
  }
}
