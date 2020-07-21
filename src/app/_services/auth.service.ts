import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import {TokenStorageService} from './token-storage.service';
import {LoanUserObj} from '../loan-users';

const AUTH_API = 'http://localhost:8081/api/auth/';

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
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  addNewUser(user: LoanUserObj): Observable<any> {

    return this.http.post(AUTH_API + 'addUser', {
      userFirstname: user.userFirstname,
      userLastname: user.userLastname,
      userEmail: user.userEmail,
      loanInformation: user.loanInformation,
      propertyAddress: user.propertyAddress
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
