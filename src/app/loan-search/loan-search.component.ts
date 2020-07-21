import { Component, OnInit } from '@angular/core';
import { LoanService } from '../_services/loan.service';
import { ActivatedRoute, Router } from '@angular/router';
import {TokenStorageService} from '../_services/token-storage.service';
import {AuthService} from '../_services/auth.service';
import { LoanUserObj } from '../loan-users';
import { LoanInformation } from '../loan-information';
import { PropertyAddress } from '../property-address';

@Component({
  selector: 'app-loan-search',
  templateUrl: './loan-search.component.html',
  styleUrls: ['./loan-search.component.css']
})
export class LoanSearchComponent implements OnInit {
  isNotUnique = false;
  errormessage = '';
  isSearchFailed = false;
  isViewDetails = false;
  isAdminRole = false;
  isDisplayDetails= false;
  loanInformation: LoanInformation;
  loanUserObj: LoanUserObj;
  address: PropertyAddress;
  isUpdateAllowed = false;
  isUpdateSuccess=false;

  constructor(private authService: AuthService, private loanService: LoanService, private router: Router,
              private token: TokenStorageService) {
                this.loanUserObj = new LoanUserObj();
                this.loanUserObj.propertyAddress = new PropertyAddress();
                this.loanUserObj.loanInformation = new LoanInformation();
              }
  ngOnInit() {
    console.log(this.token.getUser());
    this.token.getUser();
    this.token.getUser().roles[0] === 'ROLE_ADMIN' ? this.isAdminRole = true : this.isAdminRole = false;
  }
  search() {
    this.loanService.search(this.loanUserObj).subscribe((data) => {
        this.isNotUnique = true;
        this.isSearchFailed = false;
        this.loanUserObj = data;
      },
      (error) => {
        this.isSearchFailed = true;
        this.isNotUnique = false;
        this.errormessage = error;
      }
    );
  }

  viewDetails() {
    this.isUpdateAllowed=false;
    this.isDisplayDetails=true;
  }

  updateDetails() {
    this.isDisplayDetails=true;
    this.isUpdateAllowed=true;
  }

  goBack() {
    this.router.navigateByUrl('/user');
  }

  public goBackToSearch() {
    this.loanUserObj = new LoanUserObj();
    this.isDisplayDetails=false;
  }

  public updateUser() {
    this.loanService.updateUser(this.loanUserObj).subscribe((data) => {
      this.isUpdateSuccess = true;
    },
      (error) => {
        this.errormessage = error.error.errormessage;
      });
  }

}
