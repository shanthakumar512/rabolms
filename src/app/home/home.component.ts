import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content: string;

  constructor() { }

  ngOnInit() {
    
   /*  this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    ); */
    this.content="Welcome to Rabobank's Loan Management system. Users can verify the details regarding their Loans. Admins can Add a new Loan detail or Modify data for existing loans";
  }

  
}
