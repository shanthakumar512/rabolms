import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProfileComponent } from './profile.component';

import {User,Role} from '../user';
import {TokenStorageService} from '../_services/token-storage.service';

class MockTokenStorageService extends TokenStorageService {

 getUser() {
  const role: Role= {
    id :4,
    name:'ROLE_ADMIN'
  };
  const user:  User= { 
    username: 'admin1',
    email: 'admin1@gmail.com',
    password:'',
    roles:role
  }
  return user;
 }
}

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports : [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  function setup() {
    const app = fixture.debugElement.componentInstance;
    return { fixture, app };
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
