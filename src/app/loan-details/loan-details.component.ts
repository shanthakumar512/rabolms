import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoanUser } from '../loan-user';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { TokenStorageService } from '../_services/token-storage.service';
import { User } from '../user';
import {LoanService} from '../_services/loan.service'

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.css']
})
export class LoanDetailsComponent implements OnInit {
  form: any = {};
  loanUser:LoanUser;
  currentUser:User;
  currentRole:any;
  isAdminRole=false;
  isUpdateSuccess=false;
  errormessage:any;
  constructor( private route: ActivatedRoute,
    private router: Router, private token: TokenStorageService, private loanService: LoanService,) { 

    }

  ngOnInit() {

    this.currentUser=this.token.getUser();
    this.currentRole=this.currentUser.roles;
    this.currentRole[0] =='ROLE_ADMIN'? this.isAdminRole=true : this.isAdminRole=false;
    this.loanUser=history.state;
  }
 goBack(){
   this.router.navigateByUrl("/searchLoan")
 }

 updateUser(){
  
   this.loanService.updateUser(this.loanUser).subscribe(data=>{
     this.isUpdateSuccess=true;
   }, 
   error =>{ this.errormessage=error.error.errormessage;} 
  );
 }
}
