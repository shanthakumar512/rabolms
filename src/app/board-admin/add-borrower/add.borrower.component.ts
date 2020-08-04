import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import {Router} from '@angular/router';
import { Borrower } from '../../borrower';
import { LoanInformation } from '../../loan-information';
import { PropertyAddress } from '../../property-address';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-add-borrower',
  templateUrl: './add-borrower.component.html',
  styleUrls: ['./add-borrower.component.css']
})
export class AddBorrowerComponent implements OnInit, AfterViewInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  borrower: Borrower;
  // borrowerList: Array<Borrower>;
  propertyAddress: PropertyAddress;
  borrowers: Array<Borrower>;
  public numberOfBorrowers: number;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
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


  constructor(private authService: AuthService, private router: Router) {
    this.borrower = new Borrower();
    this.borrower.propertyAddress = new PropertyAddress();
   }

  ngOnInit() {

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }




  onSubmit() {
    this.authService.addNewUser(this.borrower).subscribe(
      (data) => {
        this.dataSource.data = data;
        this.numberOfBorrowers = data.length;
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.ngAfterViewInit();
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
