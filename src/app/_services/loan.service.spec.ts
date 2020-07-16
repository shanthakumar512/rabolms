import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoanService } from './loan.service';

describe('LoanService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [LoanService]
  }));

  it('should be created', () => {
    const service: LoanService = TestBed.get(LoanService);
    expect(service).toBeTruthy();
  });
  it('should  have search method', () => {
    const service: LoanService = TestBed.get(LoanService);
    expect(service.search).toBeTruthy();
  });
});
