import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { AuthGuard } from './auth-guard.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './_services/auth.service';
import { Observable, of } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
class RouterMock {

  navigateByUrl(url: string) {
    return url;
  }
  navigate(url: String){
    return url;
  }

  serializeUrl(url: string) {
     return url;
  } // Dummy further methods here if required

}
class MockAuthService extends AuthService {

  login(credentials): Observable<String> {
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

describe('AuthGuardGuard', () => {
 
  let authGuard: AuthGuard;
  const routerMock = jasmine.createSpyObj('Router', ['navigate']);
  const authMock = jasmine.createSpyObj('MockAuthService', ['isAuthenticated']);

  beforeEach(() => {
    authGuard = new AuthGuard(authMock, routerMock);
  });

  it('should be createable', () => expect(authGuard).toBeTruthy());

  it('should return true for canActivate() and not set loginService.redirectUrl when isLoggedIn === true', ()=> {
    authMock.isAuthenticated.and.returnValue(true);
    const result = authGuard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{url: 'testUrl'});
    expect(result).toBe(true);
  });

it('should return false for canActivate() and set loginService.redirectUrl when isLoggedIn === false', ()=> {
  authMock.isAuthenticated.and.returnValue(false);
  const result = authGuard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{url: 'testUrl'});
  expect(result).toBe(false);
});

});
