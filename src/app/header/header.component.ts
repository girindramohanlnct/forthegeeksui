import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  activeTab = "";
  isHam = false;
  isShow = false;
  userIsAuthenticated;
  authListnerSubs: Subscription;
  constructor(private authService: AuthService) {

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListnerSubs = this.authService.getAuthStatusListener().subscribe( (isAuthenticated) => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  ngOnInit(): void {}

  hamClick() {
    console.log('huss');
    this.isShow = !this.isShow
    this.isHam = !this.isHam;
  }

  getActiveTab(tab) {
    this.isShow = !this.isShow
   this.activeTab = tab;

 }
 onLogout() {
  this.authService.logout();
}

}
