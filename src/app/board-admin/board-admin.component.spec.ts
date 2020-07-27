import { async, ComponentFixture, TestBed , inject} from '@angular/core/testing';

import { BoardAdminComponent } from './board-admin.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {Router} from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { Observable, of } from 'rxjs';
import {Role, User} from '../user';

class RouterMock {

  navigateByUrl(url: string) {
    return url;
  }

  serializeUrl(url: string) {
     return url;
  } // Dummy further methods here if required

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
  getToken() {
    sessionStorage.setItem('auth-token', 'ad');
    return sessionStorage.getItem('auth-token');
  }
 }




describe('BoardAdminComponent', () => {
  let component: BoardAdminComponent;
  let fixture: ComponentFixture<BoardAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardAdminComponent ],
      providers : [{provide: Router, useClass: RouterMock},
        { provide: TokenStorageService, useClass: MockTokenStorageService}],
      imports : [
      HttpClientTestingModule,
      FormsModule,
      RouterTestingModule.withRoutes([]),
], schemas: [
  CUSTOM_ELEMENTS_SCHEMA
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
    const app = fixture.debugElement.componentInstance;
    return { fixture, app };
  }
  it('should have a tag as \'RaboBank Loan Management system!\'', async(() => {
    const { app } = setup();
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    const ptag = compile.querySelector('p');
    expect(ptag.textContent).toBe('Please click on Search Loans button to Search and Modify Existing Loan information');
  }));

  it('should create', () => {

    expect(component).toBeTruthy();
  });

  describe('#displayForm', () => {
    it('should call Router.navigateByUrl("/adduser") with the ID of the form', inject([Router], (router: Router) => {

        const spy = spyOn(router, 'navigateByUrl');
        component.openAddUserForm();
        const url = spy.calls.first().args[0];
        expect(url).toBe('/adduser');
    }));

    it('should call Router.navigateByUrl("/searchLoan") with the ID of the form', inject([Router], (router: Router) => {
      const spy = spyOn(router, 'navigateByUrl');

      component.openSearchForm();

      const url = spy.calls.first().args[0];

      expect(url).toBe('/searchLoan');
  }));

  it('should call Router.navigateByUrl("/addLoanInfo") with the ID of the form', inject([Router], (router: Router) => {
    const spy = spyOn(router, 'navigateByUrl');

    component.openAddLoanInformationForm();

    const url = spy.calls.first().args[0];

    expect(url).toBe('/addLoanInfo');
}));

});

});
