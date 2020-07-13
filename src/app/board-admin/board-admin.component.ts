import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../_services/user.service';
// import {NgbModal, NgbDate,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {TokenStorageService}  from '../_services/token-storage.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {DialogOverviewExampleDialog} from '../dialog-overview-example-dialog';



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


  constructor(private userService: UserService, 
    public dialog: MatDialog, private tokenStorageService: TokenStorageService) { }

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
  openDialog(): void {
    console.log('The dialog is open');
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}


