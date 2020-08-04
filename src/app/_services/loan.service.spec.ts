import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoanService } from './loan.service';
import { LoanInformation } from '../loan-information';
import { SearchCriteria } from '../search-criteria';

describe('LoanService', () => {
  let injector: TestBed;
  let service: LoanService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoanService]
    });
    injector = getTestBed();
    service = injector.get(LoanService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const services: LoanService = TestBed.get(LoanService);
    expect(services).toBeTruthy();
  });
  it('should  have search method', () => {
    const loanservice: LoanService = TestBed.get(LoanService);
    expect(loanservice.search).toBeTruthy();
  });

  describe('#getUsers', () => {
    it('should return an Observable<LoanInformation[]>', () => {

      const loanInformation: LoanInformation = {
        loanUserEmail: '',
        loanNumber: 'ABC123',
        loanAmount: 13215,
        loanTerm: 45,
        loanStatus: 'ACTIVE',
        loanMgtFees: 4500,
        originationAccount: 'ABC123',
        originationDate:  new Date()
    };

      service.addNewLoan(loanInformation).subscribe((users) => {
        expect(users).toEqual(loanInformation);
      });

      const req = httpMock.expectOne(`http://localhost:8765/api/loanInfo/addLoanInfo`);
      expect(req.request.method).toBe('POST');
      req.flush(loanInformation);
    });
  });

  describe('#updateLoan', () => {
    it('should return an Observable<LoanInformation[]>', () => {

      const loanInformation: LoanInformation = {
        loanUserEmail: 'abc@gmail.com',
        loanNumber: 'ABC123',
        loanAmount: 13215,
        loanTerm: 45,
        loanStatus: 'ACTIVE',
        loanMgtFees: 4500,
        originationAccount: 'ABC123',
        originationDate:  new Date()
    };

      service.updateLoan(loanInformation).subscribe((users) => {
        expect(users).toEqual(loanInformation);
      });

      const req = httpMock.expectOne(`http://localhost:8765/api/loanInfo/updateLoanInfo`);
      expect(req.request.method).toBe('POST');
      req.flush(loanInformation);
    });
  });

  describe('#updateLoan', () => {
    it('should return an Observable<LoanInformation[]>', () => {

      const searchCriteria: SearchCriteria = {
        borrowerFirstname : '',
        borrowerLastname: '',
        loanNumber: 'ABC123'
        };
      const loanInformation: LoanInformation = {
          loanUserEmail: 'abc@gmail.com',
          loanNumber: 'ABC123',
          loanAmount: 13215,
          loanTerm: 45,
          loanStatus: 'ACTIVE',
          loanMgtFees: 4500,
          originationAccount: 'ABC123',
          originationDate:  new Date()
      };

      service.search(searchCriteria).subscribe((loaninfo) => {
        console.log('****************' + loaninfo.loanNumber);
        expect(loaninfo.loanNumber).toEqual(loanInformation.loanNumber);
      });
      // return this.http.post<LoanInformation>('http://localhost:8765/api/searchinfo/loanInformation' , {

      const req = httpMock.expectOne(`http://localhost:8765/api/searchinfo/loanInformation`);
      expect(req.request.method).toBe('POST');
      req.flush(searchCriteria);
    });
  });

});

