import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import {FormsModule} from '@angular/forms';
import {TokenStorageService} from '../_services/token-storage.service';
import {User,Role} from '../user';

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
  saveUser(user) {
    sessionStorage.removeItem('auth-user');
    sessionStorage.setItem('auth-user', JSON.stringify(user));
  }
  
 }

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers:[{ provide: TokenStorageService, useClass:MockTokenStorageService} ],
      imports : [
        HttpClientTestingModule,
        FormsModule,
        RouterTestingModule.withRoutes([]),
  ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // window.location.reload = () => console.log('Mock redirect');
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    
    expect(component).toBeTruthy();
  });

  /* it('should create', () => {
    spyOn(window.location, 'reload').and.callFake(()=>{});
    expect(component.reloadPage).toHaveBeenCalled(); 

  }); */
  it('should create onSubmit() and set isSuccessful as True', () => {
    let loanservice= fixture.debugElement.injector.get(TokenStorageService);
    let response :any;
    fixture.detectChanges();
    component.onSubmit();
    fixture.detectChanges();
    expect(component.isLoginFailed).toBeFalsy();
  });


});
