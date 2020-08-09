import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { ProfileComponent } from './profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddBorrowerComponent } from './board-admin/add-borrower/add.borrower.component';
import { LoanSearchComponent } from './loan-search/loan-search.component';
// import { LoanDetailsComponent } from './loan-search/loan-details/loan-details.component';
import { AgGridModule } from 'ag-grid-angular';
import { AddLoanInformationComponent } from './board-admin/add-loan-information/add-loan-information.component';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {HashLocationStrategy,LocationStrategy} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BoardAdminComponent,
    ProfileComponent,
    AddBorrowerComponent,
    LoanSearchComponent,
    AddLoanInformationComponent
      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
     MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    AgGridModule.withComponents([])
  ],
  entryComponents: [],
  providers: [authInterceptorProviders,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    {provide: LocationStrategy, useValue: HashLocationStrategy },
    JwtHelperService],
  bootstrap: [AppComponent]

})
export class AppModule { }
