import { Component, ViewChild, Injectable, OnInit, AfterViewInit } from '@angular/core';
import {TokenStorageService} from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { LoanService } from '../_services/loan.service';
import { Borrower } from '../borrower';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit , AfterViewInit {



  constructor(private router: Router, private loanService: LoanService, private tokenStorageService: TokenStorageService) { }

  content = '';
  closeResult = '';
  adminUser: boolean;
  roles: Array<string>;
  isLoggedIn = false;
  isAddNewLoan = false;
  animal: string;
  name: string;
  borrowers: Array<Borrower>;
  public dataLength: number;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;



  public displayedColumns = [
    'borrowerFirstname',
    'borrowerLastname',
    'borrowerEmail',
    'addressLine1',
    'addressLine2',
    'addressLine3',
    'city',
    'state',
    'country'
];

public dataSource = new MatTableDataSource();

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.loanService.loadAllBorrowers().subscribe((data) => {
          this.dataSource.data = data;
          this.dataLength = data.length;
        });
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.roles[0] === 'ROLE_ADMIN' ?  this.adminUser = true :  this.adminUser = false;
    }
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openAddUserForm() {
    this.router.navigateByUrl('/adduser');
  }

  openAddLoanInformationForm() {
    this.router.navigateByUrl('/addLoanInfo');
  }

}



