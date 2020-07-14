import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../_services/user.service';
// import {NgbModal, NgbDate,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
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


  constructor(private userService: UserService,  private router: Router,
     private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.adminUser = this.roles.includes('ROLE_ADMIN');
    
    }
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  openAddUserForm(){
    this.router.navigateByUrl("/adduser")
  }
  openSearchForm(){
    this.router.navigateByUrl("/searchLoan")
  }

}


