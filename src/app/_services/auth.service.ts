import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenStorageService} from './token-storage.service';
import {Borrower} from '../borrower';

// const AUTH_API = 'http://localhost:8765/api/';

const AUTH_API = 'https://userauthentication.cfapps.io/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isEntitledToModify = false;

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'auth/signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  addNewUser(borrower: Borrower): Observable<any> {

    return this.http.post(AUTH_API + 'loanUser/addLoanUser', {
      borrowerFirstname: borrower.borrowerFirstname,
      borrowerLastname: borrower.borrowerLastname,
      borrowerEmail: borrower.borrowerEmail,
      propertyAddress: borrower.propertyAddress
    }, httpOptions);
  }


  public isAuthenticated(): boolean {
    return !!this.tokenStorageService.getToken();
  }

  public isUserEntitledToModify(): boolean {
     return this.isEntitledToModify;
  }

  public setModificationEntitlement( isEntitledToModify ) {
    this.isEntitledToModify = isEntitledToModify;
  }
}
