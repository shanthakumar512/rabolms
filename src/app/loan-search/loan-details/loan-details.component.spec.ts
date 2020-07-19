import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import { LoanDetailsComponent } from './loan-details.component';
import {User, Role} from '../../user';
import {LoanUser} from '../../loan-user';
import { TokenStorageService } from '../../_services/token-storage.service';
import { hostViewClassName } from '@angular/compiler';


class MockTokenStorageService extends TokenStorageService{

 getUser() {
  const role: Role= {
    id :4,
    name:'ROLE_ADMIN'
  };
  const user:  User= { 
    username: 'admin1',
    email: 'admin1@gmail.com',
    password:'',
    roles:role
  }
  return user;
 }

 getToken(){
   sessionStorage.setItem('auth-token','ad')
   return sessionStorage.getItem('auth-token');
 }
}


describe('LoanDetailsComponent', () => {
  let component: LoanDetailsComponent;
  let fixture: ComponentFixture<LoanDetailsComponent>;
  
const loanUser : LoanUser = {
  userEmailId:'abc@gmail.com',
  userFirstname:'user1',
  userLastname :'user1',
  loanNumber: 'ABC123',
  addressLine1 : 'addressLine1',
  addressLine2 :'addressLine2',
  addressLine3 :'addressLine3',
  city : 'city',
  state :'state',
  country : 'country'
 }


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanDetailsComponent ],
      providers : [ { provide: TokenStorageService, useClass:MockTokenStorageService} ],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanDetailsComponent);
    component = fixture.componentInstance;
    window.history.pushState({state:loanUser }, '', '/details');
    fixture.detectChanges();
  });

  it('should have a tag as \'Details of Searched Loan!\'', async(() => {
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    const h2tag = compile.querySelector('h2');
    expect(h2tag.textContent).toBe('Details of Searched Loan');
  }));

  it('should create LoanDetailsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call goBack()', () => {
    expect(component.goBack()).toBeUndefined();
  });

  
  it('should call goBack()', () => {
    
    expect(component.goBack()).toBeUndefined();
  });
  
});

