import { Component, OnInit } from '@angular/core';
import { LoanInformation } from '../../loan-information';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { LoanService } from '../../_services/loan.service';

@Component({
  selector: 'app-add-loan-information',
  templateUrl: './add-loan-information.component.html',
  styleUrls: ['./add-loan-information.component.css']
})
export class AddLoanInformationComponent implements OnInit {
  loanInformation: LoanInformation;
  loanInformationList: Array<LoanInformation>;
  errorMessage = '';
  isSuccessful = false;
  isNewLoanEntryFailed = false;
  constructor(private loanService: LoanService, private router: Router) {

    this.loanInformation = new LoanInformation();
  }

  ngOnInit() {
  }

  onSubmit() {
    this.loanService.addNewLoan(this.loanInformation).subscribe(
      (data) => {
        this.isSuccessful = true;
        this.loanInformationList = data;
      },
      (err) => {
        this.isNewLoanEntryFailed = true;
        this.errorMessage = err.error.message;
      }
    );
  }

  goBack() {
    this.router.navigateByUrl('/user');
  }


}
