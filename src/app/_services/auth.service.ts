import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService,JwtModule } from '@auth0/angular-jwt';
import {TokenStorageService} from './token-storage.service';

const AUTH_API = 'http://localhost:8081/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  addNewUser(user): Observable<any> {
    return this.http.post(AUTH_API + 'addUser', {
      userFirstname: user.userFirstname,
      userLastname: user.userLastname,
      loanNumber: user.loanNumber,
      addressLine1:user.addressLine1,
      addressLine2:user.addressLine2,
      addressLine3:user.addressLine3,
      city:user.city,
      state:user.state,
      country:user.country
     
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password

    }, httpOptions);
  }


  public isAuthenticated(): boolean {
   
    return !!this.tokenStorageService.getToken();
  }


}
