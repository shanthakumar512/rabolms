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
    // let params = new HttpParams().set("userFirstname",user.userFirstname).set("userLastname", user.userLastname).set("loanNumber",user.loanNumber);
    return this.http.post<LoanUser>('http://localhost:8080/api/auth/' + 'searchUser', {
      userFirstname: user.userFirstname,
      userLastname: user.userLastname,
      loanNumber: user.loanNumber
    }, httpOptions);
  }

}
