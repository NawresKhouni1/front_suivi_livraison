import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

  constructor(private auth : AuthService) {
    

  }

  private subscription!: Subscription;
 

  ngOnDestroy() {
    if (this.subscription)
    this.subscription.unsubscribe();
  }
  
  notificationsNumber: number = 0;

  onNotificationsNumberChange(notificationsNumber: number) {
    this.notificationsNumber = notificationsNumber;
  }
  logout(): void {
    this.auth.logout();
  }
 

}
