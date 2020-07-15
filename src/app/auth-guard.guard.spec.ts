import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { AuthGuard } from './auth-guard.guard';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard],
      imports: [HttpClientTestingModule,
        RouterTestingModule]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should have canActivate method', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard.canActivate).toBeTruthy();
  }));
});
