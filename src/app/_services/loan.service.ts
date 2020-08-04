import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Borrower } from '../borrower';
import { LoanInformation } from '../loan-information';
import { SearchCriteria } from '../search-criteria';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) { }

  search(searchCriteria: SearchCriteria): Observable<any> {
    return this.http.post<LoanInformation>('http://localhost:8765/api/searchinfo/loanInformation' , {
      borrowerFirstname: searchCriteria.borrowerFirstname,
      borrowerLastname: searchCriteria.borrowerLastname,
      loanNumber : searchCriteria.loanNumber
    }, httpOptions);
  }

  /* updateUser(user: LoanUserObj): Observable<any> {
    return this.http.put<LoanUserObj>('http://localhost:8081/api/auth/' + 'updateUser', {
      userFirstname: user.userFirstname,
      userLastname: user.userLastname,
      userEmail: user.userEmail,
      propertyAddress: user.propertyAddress
    }, httpOptions);
  } */


  loadAllBorrowerEmails(): Observable<any> {
    return this.http.get('http://localhost:8765/api/loanUser/getAllBorrowerEmails', httpOptions);
  }

  loadAllBorrowers(): Observable<any> {
    return this.http.get('http://localhost:8765/api/loanUser/getLoanUsers', httpOptions);
  }


  addNewLoan(loanInfo: LoanInformation): Observable<any> {

    return this.http.post<string>('http://localhost:8765/api/loanInfo/addLoanInfo', {
      loanUserEmail: loanInfo.loanUserEmail,
      loanNumber: loanInfo.loanNumber,
      loanAmount: loanInfo.loanAmount,
      loanTerm: loanInfo.loanTerm,
      loanStatus: loanInfo.loanStatus,
      loanMgtFees: loanInfo.loanMgtFees,
      originationAccount: loanInfo.originationAccount,
      originationDate: loanInfo.originationDate,
    }, httpOptions);
  }

  updateLoan(loanInfo: LoanInformation): Observable<any> {
    return this.http.post('http://localhost:8765/api/loanInfo/updateLoanInfo', {
      loanUserEmail: loanInfo.loanUserEmail,
      loanNumber: loanInfo.loanNumber,
      loanAmount: loanInfo.loanAmount,
      loanTerm: loanInfo.loanTerm,
      loanStatus: loanInfo.loanStatus,
      loanMgtFees: loanInfo.loanMgtFees,
      originationAccount: loanInfo.originationAccount,
      originationDate: loanInfo.originationDate,
    }, httpOptions);
  }

}
