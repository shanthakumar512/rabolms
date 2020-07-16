import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import { LoanDetailsComponent } from './loan-details.component';
import {User} from '../user';

describe('LoanDetailsComponent', () => {
  let component: LoanDetailsComponent;
  let fixture: ComponentFixture<LoanDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanDetailsComponent ],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  /* function setup() {
    const fixture = TestBed.createComponent(LoanDetailsComponent);
    const app = fixture.debugElement.componentInstance;
    return { fixture, app };
  }
  it('should have a tag as \'Details of Searched Loan!\'', async(() => {
    const { app, fixture } = setup();
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    const h2tag = compile.querySelector('h2');
    expect(h2tag.textContent).toBe('Details of Searched Loan');
  })); */

 /*  it('should create', () => {
    expect(component).toBeTruthy();
  }); */
});
