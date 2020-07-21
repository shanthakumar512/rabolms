import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddUserComponent } from './add-user.component';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { Observable, of } from 'rxjs';
import { LoanUserObj } from '../../loan-users';
import { PropertyAddress } from '../../property-address';
import { LoanInformation } from '../../loan-information';
// import {LoanUser} from '../../loan-user';
const propertyAddresss: PropertyAddress = {
  addressLine1 : 'addressLine1',
  addressLine2 : 'addressLine2',
  addressLine3 : 'addressLine3',
  city : 'city',
  state : 'state',
  country : 'country'
};
const loanInformation: LoanInformation = {
  loanNumber: 'ABC123',
    loanAmount: 13215,
    loanTerm: 45,
    loanStatus: 'ACTIVE',
    loanMgtFees: 4500,
    originationAccount: 'ABC123',
    originationDate:  new Date()
};
const loanUserObj: LoanUserObj = {

  userFirstname: 'user1',
  userLastname : 'user1',
  userEmail: 'abc@gmail.com',
  loanInformation,
  propertyAddress: propertyAddresss,

 };
class MockAuthService extends AuthService {

login(credentials): Observable<String> {
  return of('Login Success');
}

 addNewUser(user): Observable<any> {
   return ;
  }
}


describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUserComponent],
      providers : [ { provide: AuthService, useClass: MockAuthService} ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        RouterTestingModule.withRoutes([]),
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create onSubmit() and set isSuccessful as True', () => {
    const authservice = fixture.debugElement.injector.get(AuthService);
    let response: any;
    spyOn(authservice, 'addNewUser').and.returnValue(of(response));
    console.log(response);
    component.onSubmit();
    fixture.detectChanges();
    expect(component.isSuccessful).toBeTruthy();
  });

  describe('#userform', () => {
    it('should call Router.navigateByUrl("/user") with the ID of the form', inject([Router], (router: Router) => {
        const spy = spyOn(router, 'navigateByUrl');
        component.goBack();
        const url = spy.calls.first().args[0];
        expect(url).toBe('/user');
  }));
});


});
