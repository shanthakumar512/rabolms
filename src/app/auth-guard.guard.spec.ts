import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { AuthGuard } from './auth-guard.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './_services/auth.service';
import { Observable, of } from 'rxjs';import {JwtHelperService} from '@auth0/angular-jwt';
import { TokenStorageService } from './_services/token-storage.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Role, User } from './user';


class RouterMock {

  navigateByUrl(url: string) {
    return url;
  }
  navigate(url: string) {
    return url;
  }

  serializeUrl(url: string) {
     return url;
  } // Dummy further methods here if required

}
class MockAuthService extends AuthService {

  login(credentials): Observable<string> {
    return of('Login Success');
  }

   addNewUser(user): Observable<any> {
     return ;
    }

     isAuthenticated(): boolean {
      return false;
    }
     isUserEntitledToModify(): boolean {
      return this.isEntitledToModify;
   }

    setModificationEntitlement( isEntitledToModify ) {
     this.isEntitledToModify = isEntitledToModify;
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

    getToken(){
      return sessionStorage.getItem('auth-token');
    }
   }
  

describe('AuthGuardGuard', () => {

  let authGuard: AuthGuard;
  const routerMock = jasmine.createSpyObj('Router', ['navigate']);
  const authMock = jasmine.createSpyObj('MockAuthService', ['isAuthenticated']);
  const tokenMock = jasmine.createSpyObj('TokenStorageService',['getToken'])
  const jwtHelper = jasmine.createSpyObj('JwtHelperService',['isTokenExpired'])
  
  // const jwtHelper= jasmine.createSpyObj('')
  beforeEach(() => {
    authGuard = new AuthGuard(authMock, routerMock,jwtHelper,tokenMock);
  });

  it('should be createable', () => expect(authGuard).toBeTruthy());

  it('should return true for canActivate() and not set loginService.redirectUrl when isLoggedIn === true', () => {
    authMock.isAuthenticated.and.returnValue(true);
    jwtHelper.isTokenExpired.and.returnValue(false);
    const result = authGuard.canActivate(new ActivatedRouteSnapshot(), {url: 'testUrl'} as RouterStateSnapshot);
    expect(result).toBe(true);
  });

  it('should return false for canActivate() and set loginService.redirectUrl when isLoggedIn === false', () => {
  authMock.isAuthenticated.and.returnValue(false);
  jwtHelper.isTokenExpired.and.returnValue(true);
  const result = authGuard.canActivate(new ActivatedRouteSnapshot(), {url: 'testUrl'} as RouterStateSnapshot);
  expect(result).toBe(false);
});

});
