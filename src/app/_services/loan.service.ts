import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoanUserObj } from '../loan-users';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
})
};


@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) { }

  search(user: LoanUserObj): Observable<LoanUserObj> {
    return this.http.post<LoanUserObj>('http://localhost:8081/api/auth/' + 'searchUser', {
      userFirstname: user.userFirstname,
      userLastname: user.userLastname,
      loanInformation: user.loanInformation,
    }, httpOptions);
  }

  updateUser(user: LoanUserObj): Observable<LoanUserObj> {
    return this.http.put<LoanUserObj>('http://localhost:8081/api/auth/' + 'updateUser', {
      userFirstname: user.userFirstname,
      userLastname: user.userLastname,
      userEmail: user.userEmail,
      loanInformation: user.loanInformation,
      propertyAddress: user.propertyAddress
    }, httpOptions);
  }

}
