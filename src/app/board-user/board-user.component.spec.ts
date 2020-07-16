import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import { BoardUserComponent } from './board-user.component';

describe('BoardUserComponent', () => {
  let component: BoardUserComponent;
  let fixture: ComponentFixture<BoardUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardUserComponent ],
      imports: [
        RouterTestingModule.withRoutes([])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function setup() {
    const app = fixture.debugElement.componentInstance;
    return { fixture, app };
  }
  it('should have a tag as \'RaboBank Loan Management system!\'', async(() => {
    const { app } = setup();
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    const ptag = compile.querySelector('p');
    expect(ptag.textContent).toBe('Please click on Search Loans button to Search and View Loan information');
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
