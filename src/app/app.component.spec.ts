import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {TokenStorageService} from './_services/token-storage.service';
import {User, Role} from './user';
import { Router } from '@angular/router';

class MockTokenStorageServiceForAdmin extends TokenStorageService {

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

 }



describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [  { provide: TokenStorageService, useClass: MockTokenStorageServiceForAdmin}],
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents(); });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  function setup() {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    return { fixture, app };
  }

  it('should have a tag as \'RaboBank Loan Management system!\'', async(() => {
    const { app, fixture } = setup();
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    const h1tag = compile.querySelector('a');
    expect(h1tag.textContent).toBe('RaboBank Loan Management system');
  }));
  it('should have a tag as \'RaboBank Loan Management system!\'', async(() => {
    const { app, fixture } = setup();
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    const h1tag = compile.querySelector('title');
    expect(h1tag.textContent).toBe('RaboBank Loan Managenement System');
  }));

  it('should call  logout', inject([TokenStorageService], (token: TokenStorageService) => {
      const { app, fixture } = setup(); 
      fixture.detectChanges();
      const spy = spyOn(token, 'signOut');
      app.logout();
    expect(spy).toHaveBeenCalled();
  }));

});


