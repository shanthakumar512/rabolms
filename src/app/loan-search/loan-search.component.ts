import { Component, OnInit } from '@angular/core';
import { LoanService } from  '../_services/loan.service';
import {LoanUser} from '../loan-user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-loan-search',
  templateUrl: './loan-search.component.html',
  styleUrls: ['./loan-search.component.css']
})
export class LoanSearchComponent implements OnInit {
  isNotUnique=false;
  errormessage='';
  form: any = {};
  loanuser=[];
  loanusers: LoanUser;
  constructor(private loanService: LoanService, private router : Router){ }

  ngOnInit() {
  }
  
  search(){
    this.loanService.search(this.form).subscribe(
      data => {
        this.isNotUnique=true;
        this.loanusers=data;
      },
      error =>{
        this.errormessage=error.error.errormessage;
      }
      
    );
  
  }

  viewDetails(){
    this.router.navigateByUrl("/details",{state:this.loanusers})
  }
  
}
