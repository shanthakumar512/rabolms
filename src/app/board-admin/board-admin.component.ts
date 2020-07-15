import { Component, OnInit, Inject } from '@angular/core';
import {TokenStorageService}  from '../_services/token-storage.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';



@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content = '';
  closeResult = '';
  adminUser: any;
  private roles: string[];
  isLoggedIn = false;
  isAddNewLoan=false;
  animal: string;
  name: string;


  constructor(private router: Router,
     private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.adminUser = this.roles.includes('ROLE_ADMIN');
    
    }
  }

  openAddUserForm(){
    this.router.navigateByUrl("/adduser")
  }
  openSearchForm(){
    this.router.navigateByUrl("/searchLoan")
  }

}


