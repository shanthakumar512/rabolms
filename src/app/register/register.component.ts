import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isAddNewLoanFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isAddNewLoanFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isAddNewLoanFailed = true;
      }
    );
  }
}
