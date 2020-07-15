import { async, ComponentFixture, TestBed } from '@angular/core/testing';
 import { RouterTestingModule } from '@angular/router/testing';
    import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddUserComponent } from './add-user.component';
import {FormsModule} from '@angular/forms';
describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserComponent ],
      imports : [
        HttpClientTestingModule,
        FormsModule,
        RouterTestingModule.withRoutes([]),
  ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
