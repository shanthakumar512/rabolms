import { async, ComponentFixture, TestBed,inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoanSearchComponent } from './loan-search.component';
import {FormsModule} from '@angular/forms';
import { TokenStorageService } from '../_services/token-storage.service';
import {Router} from '@angular/router';
import {User,Role} from '../user';
import { Observable, of } from 'rxjs';
import {LoanUser} from '../loan-user';
 
import {LoanService}  from '../_services/loan.service';
class RouterMock {

  navigateByUrl(url: string) {
    return url;
  }

  serializeUrl(url: string) {
     return url;
  }
}

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
}
class MockLoanService extends LoanService{

user: LoanUser = {
    userEmailId: 'abc@gmail',
    userFirstname: 'abc',
    userLastname: 'aa',
    loanNumber: 'aa',
    addressLine1: 'aaaaaa',
    addressLine2: 'aa',
    addressLine3: 'aa',
    city: 'aa',
    state: 'aa',
    country: 'aa'
}
 search():Observable<LoanUser> {
  let users: LoanUser;
  users:this.user;
  return of(this.user);
 }
}
describe('LoanSearchComponent', () => {
  let component: LoanSearchComponent;
  let fixture: ComponentFixture<LoanSearchComponent>;
  let tokenStorageStub: Partial<TokenStorageService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanSearchComponent ],
      providers : [ { provide: TokenStorageService,useClass:MockTokenStorageService} ,
       {provide: Router, useClass: RouterMock}],
      imports : [
        HttpClientTestingModule,
         FormsModule,
        RouterTestingModule.withRoutes([]),
  ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create LoanSearchComponent', () => {
    let tokenService= fixture.debugElement.injector.get(TokenStorageService)
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
    let loanservice= fixture.debugElement.injector.get(LoanService);
    let response :any;
    fixture.detectChanges();
    component.search();
    fixture.detectChanges();
    expect(component.isSearchFailed).toBeFalsy();
  });

  describe('#displayForm', () => {
    it('should call Router.navigateByUrl("/user") with the ID of the form', inject([Router], (router: Router) => {
        const spy = spyOn(router, 'navigateByUrl');
        component.goBack();
        const url = spy.calls.first().args[0];
        expect(url).toBe('/user');
    }));

    it('should call Router.navigateByUrl("/details") with the ID of the form', inject([Router], (router: Router) => {
      const spy = spyOn(router, 'navigateByUrl');
      component.viewDetails();
      const url = spy.calls.first().args[0];
      expect(url).toBe('/details');
  }));
  it('should call Router.navigateByUrl("/details") with the ID of the form', inject([Router], (router: Router) => {
    const spy = spyOn(router, 'navigateByUrl');
    component.updateDetails();
    const url = spy.calls.first().args[0];
    expect(url).toBe('/details');
}));

});


});
