import { async, ComponentFixture, TestBed,inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddUserComponent } from './add-user.component';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { Observable, of } from 'rxjs';
// import { of } from 'rxjs';
import {LoanUser} from '../../loan-user';

class MockAuthService extends AuthService {

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddUserComponent],
      providers : [ { provide: AuthService, useClass:MockAuthService} ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        RouterTestingModule.withRoutes([]),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should create onSubmit() and set isSuccessful as True', () => {
    let authservice= fixture.debugElement.injector.get(AuthService);
    let response :any;
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
