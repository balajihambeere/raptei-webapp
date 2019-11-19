import { Component } from '@angular/core';
import { AuthService } from '../../services';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.scss']
})
export class AdminDashboardComponent {

  constructor(private authService: AuthService) {

  }

  logout() {
    this.authService.signOut();
  }
}
