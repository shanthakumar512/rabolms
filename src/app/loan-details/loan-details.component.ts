import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoanUser } from '../loan-user';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { TokenStorageService } from '../_services/token-storage.service';
import { User } from '../user';

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.css']
})
export class LoanDetailsComponent implements OnInit {

  loanUser:LoanUser;
  currentUser:User;
  currentRole:any;
  isAdminRole=false;

  constructor( private route: ActivatedRoute,
    private router: Router, private token: TokenStorageService) { 

    }

  ngOnInit() {

    this.currentUser=this.token.getUser();
    this.currentRole=this.currentUser.roles;
     this.currentRole[0] =='ROLE_ADMIN'? this.isAdminRole=true : this.isAdminRole=false;
  this.loanUser=history.state;
  }

}
