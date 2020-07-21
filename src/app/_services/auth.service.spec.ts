import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [AuthService]
  }));

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
    expect(service.isAuthenticated).toBeTruthy();
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
});
