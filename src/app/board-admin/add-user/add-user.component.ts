import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import {Router} from '@angular/router';
import { LoanUserObj } from '../../loan-users';
import { LoanInformation } from '../../loan-information';
import { PropertyAddress } from '../../property-address';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  loanInformation: LoanInformation;
  loanUserObj: LoanUserObj;
  propertyAddress: PropertyAddress;

  constructor(private authService: AuthService, private router: Router) {
    this.loanUserObj = new LoanUserObj();
    this.loanUserObj.propertyAddress = new PropertyAddress();
    this.loanUserObj.loanInformation = new LoanInformation();
   }

  ngOnInit() {

  }

  onSubmit() {
    this.authService.addNewUser(this.loanUserObj).subscribe(
      (data) => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  goBack() {
    this.router.navigateByUrl('/user');
  }
}
