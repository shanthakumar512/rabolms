import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';

describe('TokenStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [TokenStorageService]
  }));

  it('should be created', () => {
    const service: TokenStorageService = TestBed.get(TokenStorageService);
    expect(service).toBeTruthy();
  });
  it('should have getToken method', () => {
    const service: TokenStorageService = TestBed.get(TokenStorageService);
    expect(service.getToken).toBeTruthy();
  });
  it('should have getUser method', () => {
    const service: TokenStorageService = TestBed.get(TokenStorageService);
    expect(service.getUser).toBeTruthy();
  });
  it('should have saveToken method', () => {
    const service: TokenStorageService = TestBed.get(TokenStorageService);
    expect(service.saveToken).toBeTruthy();
  });
  it('should have saveUser method', () => {
    const service: TokenStorageService = TestBed.get(TokenStorageService);
    expect(service.saveUser).toBeTruthy();
  });
  it('should have signOut method', () => {
    const service: TokenStorageService = TestBed.get(TokenStorageService);
    service.signOut();
    expect(service.signOut).toBeTruthy();
  });
});
