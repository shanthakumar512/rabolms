import { Component, OnInit, Inject } from '@angular/core';
import {TokenStorageService} from '../_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {



  constructor(private router: Router, private tokenStorageService: TokenStorageService) { }
  content = '';
  closeResult = '';
  adminUser: boolean;
  roles: Array<string>;
  isLoggedIn = false;
  isAddNewLoan = false;
  animal: string;
  name: string;
y;

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.roles[0] === 'ROLE_ADMIN' ?  this.adminUser = true :  this.adminUser = false;
    }
  }
  openAddUserForm() {
    this.router.navigateByUrl('/adduser');
  }

  openAddLoanInformationForm() {
    this.router.navigateByUrl('/addLoanInfo');
  }

  openSearchForm() {
    this.router.navigateByUrl('/searchLoan');
  }
}



