import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoanSearchComponent } from './loan-search.component';
import {FormsModule} from '@angular/forms';
import { TokenStorageService } from '../_services/token-storage.service';
import {Router} from '@angular/router';
import {User, Role} from '../user';
import { Observable, of } from 'rxjs';
import {LoanService} from '../_services/loan.service';
import { PropertyAddress } from '../property-address';
import { LoanInformation } from '../loan-information';
import { LoanUserObj } from '../loan-users';
import { SearchCriteria } from '../search-criteria';
class RouterMock {

  navigateByUrl(url: string) {
    return url;
  }

  serializeUrl(url: string) {
     return url;
  }
}

class MockTokenStorageService extends TokenStorageService {

 getUser() {
  const role: Role = {
    id : 4,
    name: 'ROLE_ADMIN'
  };
  const user: User = {
    username: 'admin1',
    email: 'admin1@gmail.com',
    password: '',
    roles: role
  };
  return user;
 }
}
class MockLoanService extends LoanService {

   propertyAddresss: PropertyAddress = {
    addressLine1 : 'addressLine1',
    addressLine2 : 'addressLine2',
    addressLine3 : 'addressLine3',
    city : 'city',
    state : 'state',
    country : 'country'
  };
   loanInformation: LoanInformation = {
    loanUserEmail: 'abc@yahoo.com',
    loanNumber: 'ABC123',
      loanAmount: 13215,
      loanTerm: 45,
      loanStatus: 'ACTIVE',
      loanMgtFees: 4500,
      originationAccount: 'ABC123',
      originationDate:  new Date()
  };
   loanUserObj: LoanUserObj = {

    userFirstname: 'user1',
    userLastname : 'user1',
    userEmail: 'abc@gmail.com',
    propertyAddress: this.propertyAddresss

   };
}
describe('LoanSearchComponent', () => {
  let component: LoanSearchComponent;
  let fixture: ComponentFixture<LoanSearchComponent>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanSearchComponent ],
      providers : [ { provide: TokenStorageService, useClass: MockTokenStorageService} ,
       {provide: Router, useClass: RouterMock},
      {provide: LoanService, useClass: MockLoanService }],
      imports : [
        HttpClientTestingModule,
         FormsModule,
        RouterTestingModule.withRoutes([]),
  ],
    })
    .compileComponents();
    fixture = TestBed.createComponent(LoanSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const loanInformation1 : LoanInformation = {
      loanUserEmail: 'abc@yahoo.com',
      loanNumber: 'ABC123',
        loanAmount: 13215,
        loanTerm: 45,
        loanStatus: 'ACTIVE',
        loanMgtFees: 4500,
        originationAccount: 'ABC123',
        originationDate:  new Date()
    };
   const  loanInformation2: LoanInformation = {
      loanUserEmail: 'abc@yahoo.com',
      loanNumber: 'ABC123',
        loanAmount: 13215,
        loanTerm: 45,
        loanStatus: 'ACTIVE',
        loanMgtFees: 4500,
        originationAccount: 'ABC123',
        originationDate:  new Date()
    };
  
    const loanInfoList= Array<LoanInformation>();
    loanInfoList.push(loanInformation1);
    loanInfoList.push(loanInformation2);
    let loanInformationList=loanInfoList; 
    fixture.detectChanges();
    component.ngOnInit();
    
    component.loanInformationList=loanInformationList;
  
    fixture.detectChanges();

  });

  it('should create LoanSearchComponent', () => {
    const tokenService = fixture.debugElement.injector.get(TokenStorageService);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  function setup() {
    const app = fixture.debugElement.componentInstance;
    return { fixture, app };
  }
  it('should have a tag as \'RaboBank Loan Management system!\'', async(() => {
    const { app } = setup();
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    const h2tag = compile.querySelector('h2');
    expect(h2tag.textContent).toBe(' Enter Loan search criteria');
  }));

  it('should create onSubmit() and set isSuccessful as True', () => {
   const searchCriteria: SearchCriteria ={
      userFirstname :'user1',
      userLastname: '',
      loanNumber: ''
      }
    const loanservice = fixture.debugElement.injector.get(LoanService);
    const response = '';
    spyOn(loanservice, 'search').and.returnValue(of(response));
    fixture.detectChanges()
    component.search();
    fixture.detectChanges();
    expect(component.isNotUnique).toBeTruthy();
    expect(component.isSearchFailed).toBeFalsy();
  });

  it('should create updateLoan() and set isSuccessful as True', () => {
    const loanservice = fixture.debugElement.injector.get(LoanService);
    const response = '';
    spyOn(loanservice, 'updateLoan').and.returnValue(of(response));
    component.updateLoan();
    fixture.detectChanges();
    expect(component.isUpdateSuccess).toBeTruthy();
  });


  describe('#displayForm', () => {
    it('should call Router.navigateByUrl("/user") with the ID of the form', inject([Router], (router: Router) => {
        const spy = spyOn(router, 'navigateByUrl');
        component.goBack();
        const url = spy.calls.first().args[0];
        expect(url).toBe('/user');
    }));

    it('should call viewDetails()', () => {
      component.goBackToSearch();
      expect(component.isDisplayDetails).toBeFalsy();
    });

    it('should call viewDetails()', () => {
      const index=0;
      component.viewDetails(index);
      expect(component.isUpdateAllowed).toBeFalsy();
  });
    it('should call updateDetails', () => {
    const index=0;
    component.updateDetails(index);
    expect(component.isDisplayDetails).toBeTruthy();
  });

});


});
