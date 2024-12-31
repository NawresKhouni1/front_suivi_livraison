import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, private auth : AuthService) { }
    
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
