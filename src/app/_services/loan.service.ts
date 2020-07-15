import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoanUser} from '../loan-user'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
  'Access-Control-Allow-Origin':'*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
})
};


@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) { }

  search(user): Observable<LoanUser> {
    return this.http.post<LoanUser>('http://localhost:8080/api/auth/' + 'searchUser', {
      userFirstname: user.userFirstname,
      userLastname: user.userLastname,
      loanNumber: user.loanNumber
    }, httpOptions);
  }

  updateUser(user): Observable<any> {
    return this.http.put('http://localhost:8080/api/auth/' + 'updateUser', {
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

}
