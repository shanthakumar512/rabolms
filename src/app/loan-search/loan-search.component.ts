import { Component, OnInit } from '@angular/core';
import { LoanService } from '../_services/loan.service';
import {LoanUser} from '../loan-user';
import { ActivatedRoute, Router } from '@angular/router';
import {TokenStorageService} from '../_services/token-storage.service';
import {AuthService} from '../_services/auth.service';

@Component({
  selector: 'app-loan-search',
  templateUrl: './loan-search.component.html',
  styleUrls: ['./loan-search.component.css']
})
export class LoanSearchComponent implements OnInit {
  isNotUnique = false;
  errormessage = '';
  form: any = {};
  loanuser = [];
  loanusers: LoanUser;
  isSearchFailed = false;
  isViewDetails = false;
  isAdminRole = false;
  constructor(private authService: AuthService, private loanService: LoanService, private router: Router,
              private token: TokenStorageService) { }
  ngOnInit() {
    console.log(this.token.getUser()); 
    this.token.getUser();
    this.token.getUser().roles[0] === 'ROLE_ADMIN' ? this.isAdminRole = true : this.isAdminRole = false;
  }
  search() {
    console.log(this.token.getUser());
    this.loanService.search(this.form).subscribe(
      (data) => {
        this.isNotUnique = true;
        this.isSearchFailed = false;
        this.loanusers = data;
      },
      (error) => {
        this.isSearchFailed = true;
        this.isNotUnique = false;
        this.errormessage = error;
      }
    );
  }

  viewDetails() {
    this.authService.setModificationEntitlement(false);
    this.router.navigateByUrl('/details', { state: this.loanusers});
  }

  updateDetails() {
    this.authService.setModificationEntitlement(true);
    this.router.navigateByUrl('/details', { state: this.loanusers});
  }

  goBack() {
    this.router.navigateByUrl('/user');
  }
}
