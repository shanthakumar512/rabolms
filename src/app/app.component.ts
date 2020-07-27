import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: Array<string>;
  isLoggedIn = false;
  showAdminBoard = false;
  username: string;
  toggleAdminOrUser: string;
  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.roles[0] === 'ROLE_ADMIN' ?  this.showAdminBoard = true :  this.showAdminBoard = false;
      this.showAdminBoard ? this.toggleAdminOrUser = 'Admin' : this.toggleAdminOrUser = 'User';
      this.username = user.username;
    }
  }

  logout() {
    this.tokenStorageService.signOut();
  }
}
