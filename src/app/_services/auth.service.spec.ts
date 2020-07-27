import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { PropertyAddress } from '../property-address';
import { LoanUserObj } from '../loan-users';
import { User, Role } from '../user';
import { TokenStorageService } from './token-storage.service';

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

  public saveToken(token: string) {
    window.sessionStorage.removeItem('auth-token');
    window.sessionStorage.setItem('auth-token', token);
  }
 }

describe('AuthService', () => {
  let injector: TestBed;
  let service: AuthService;
  let httpMock: HttpTestingController;
  let tokenService: TokenStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService,
        { provide: TokenStorageService, useClass: MockTokenStorageService} ]
    });
    injector = getTestBed();
    service = injector.get(AuthService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  it('should have login function', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service.login).toBeTruthy();
  });
  it('should have addNewUser function', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service.addNewUser).toBeTruthy();
  });
  it('should have addNewUser function', () => {
    const service: AuthService = TestBed.get(AuthService);
    tokenService=  TestBed.get(TokenStorageService);
    tokenService.saveToken('token');
    service.isAuthenticated();
    service.setModificationEntitlement(true);
    service.isEntitledToModify;
    expect(service.isEntitledToModify).toBeTruthy();
    expect(service.isAuthenticated()).toBeTruthy();
  });
  it('should have setModificationEntitlement function', () => {
    const service: AuthService = TestBed.get(AuthService);
    service.setModificationEntitlement(true);
    expect(service.isUserEntitledToModify).toBeTruthy();
  });
  it('should have setModificationEntitlement function', () => {
    const service: AuthService = TestBed.get(AuthService);
    service.setModificationEntitlement(false);
    expect(service.setModificationEntitlement).toBeTruthy();
  });

  describe('#getUsers', () => {
    it('should return an Observable<LoanInformation[]>', () => {

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
      service.login(user).subscribe(users => {
        expect(users).toEqual(user);
      });
  
      const req = httpMock.expectOne(`http://localhost:8765/api/auth/signin`);
      expect(req.request.method).toBe("POST");
      req.flush(user);
    });
  });

  describe('#getUsers', () => {
    it('should return an Observable<LoanInformation[]>', () => {
      
      const propertyAddresss: PropertyAddress = {
        addressLine1 : 'addressLine1',
        addressLine2 : 'addressLine2',
        addressLine3 : 'addressLine3',
        city : 'city',
        state : 'state',
        country : 'country'
      };
      const loanUserObj: LoanUserObj = {

        userFirstname: 'user1',
        userLastname : 'user1',
        userEmail: 'abc@gmail.com',
        propertyAddress: propertyAddresss,
       };
      service.addNewUser(loanUserObj).subscribe(users => {
        expect(users).toEqual(loanUserObj);
      });
  
      const req = httpMock.expectOne(`http://localhost:8765/api/loanUser/addLoanUser`);
      expect(req.request.method).toBe("POST");
      req.flush(loanUserObj);
    });
  });


});
