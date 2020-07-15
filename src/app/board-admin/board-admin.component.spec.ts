import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardAdminComponent } from './board-admin.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import { BrowserDynamicTestingModule,
  platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
  
describe('BoardAdminComponent', () => {
  let component: BoardAdminComponent;
  let fixture: ComponentFixture<BoardAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardAdminComponent ],
      imports : [
      HttpClientTestingModule,
      FormsModule,
      RouterTestingModule.withRoutes([]),
],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  function setup() {
    const fixture = TestBed.createComponent(BoardAdminComponent);
    const app = fixture.debugElement.componentInstance;
    return { fixture, app };
  }
  /* it('should have a tag as \'RaboBank Loan Management system!\'', async(() => {
    const { app, fixture } = setup();
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    const ptag = compile.querySelector('p');
    expect(ptag.textContent).toBe('Please click on originate button to add New Loan information');
  })); */

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
