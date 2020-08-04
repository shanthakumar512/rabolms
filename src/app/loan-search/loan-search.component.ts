import { Component, OnInit } from '@angular/core';
import { LoanService } from '../_services/loan.service';
import { ActivatedRoute, Router } from '@angular/router';
import {TokenStorageService} from '../_services/token-storage.service';
import {AuthService} from '../_services/auth.service';
import { Borrower } from '../borrower';
import { LoanInformation } from '../loan-information';
import { PropertyAddress } from '../property-address';
import { SearchCriteria } from '../search-criteria';


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
  isDisplayDetails = false;
  loanInformationList: Array<LoanInformation>;
  borrower: Borrower;
  address: PropertyAddress;
  isUpdateAllowed = false;
  isUpdateSuccess = false;
  searchCriteria: SearchCriteria;
  loanInformation: LoanInformation;

  constructor(private authService: AuthService, private loanService: LoanService, private router: Router,
              private token: TokenStorageService) {
                this.borrower = new Borrower();
                this.borrower.propertyAddress = new PropertyAddress();
                this.searchCriteria = new SearchCriteria();
              }
  ngOnInit() {

    this.token.getUser();
    this.token.getUser().roles[0] === 'ROLE_ADMIN' ? this.isAdminRole = true : this.isAdminRole = false;
  }
  search() {
    this.isDisplayDetails = false;
    this.isSearchFailed = false;
    this.loanService.search(this.searchCriteria).subscribe((data) => {
        this.isNotUnique = true;
        this.isSearchFailed = false;
        this.loanInformationList = data;
      },
      (error) => {
        this.isSearchFailed = true;
        this.isNotUnique = false;
        this.errormessage = error;
      }
    );
  }

  viewDetails(index: number) {
    this.setLoanInfoTobeUpdated(index);
    this.isUpdateAllowed = false;
    this.isDisplayDetails = true;
  }

  updateDetails(index: number) {
    this.loanInformation = this.loanInformationList[index];
    this.isDisplayDetails = true;
    this.isUpdateAllowed = true;
  }

  setLoanInfoTobeUpdated(index: number) {
    this.loanInformation = this.loanInformationList[index];
  }

  goBack() {
    this.router.navigateByUrl('/user');
  }

  goBackToSearch() {
    this.borrower = new Borrower();
    this.searchCriteria = new SearchCriteria();
    this.isDisplayDetails = false;
    this.isSearchFailed = false;
  }
  public updateLoan() {
    this.loanService.updateLoan(this.loanInformation).subscribe((data) => {
      this.isUpdateSuccess = true;
      this.loanInformation = data;
    },
      (error) => {
        this.errormessage = error.error.errormessage;
      });
  }

}
