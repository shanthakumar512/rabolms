import { async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import {FormsModule} from '@angular/forms';
import {TokenStorageService} from '../_services/token-storage.service';
import {User, Role} from '../user';
import { AuthService } from '../_services/auth.service';
import { Observable, of  } from 'rxjs';
import { Router } from '@angular/router';

class RouterMock {

  navigateByUrl(url: string) {
    return url;
  }

  navigate(url: string) {
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
class MockAuthService extends AuthService {

  login(credentials): Observable<string> {
    return of('Login Success');
  }

   addNewUser(user): Observable<any> {
     return ;
    }
  }

const MockWindow = {
    location: {
      reload() {}
    }
  };

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [{ provide: TokenStorageService, useClass: MockTokenStorageService},
        { provide: AuthService, useClass: MockAuthService}
      ],
      imports : [
        HttpClientTestingModule,
        FormsModule,
        RouterTestingModule.withRoutes([]),
  ],
    })
    .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should create onSubmit() and set isSuccessful as True', inject([Router], (router: Router) => {
    const loanservice = fixture.debugElement.injector.get(TokenStorageService);
    const authservice = fixture.debugElement.injector.get(AuthService);
    const spy = spyOn(router, 'navigate');
    fixture.detectChanges();
    component.onSubmit();
    fixture.detectChanges();
    expect(component.isLoginFailed).toBeFalsy();
  }));
});
