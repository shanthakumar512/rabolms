import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content = '';
  
  constructor(private token: TokenStorageService,  private router : Router) { }

  ngOnInit() {
   
  }

  openSearchForm(){
    this.router.navigateByUrl("/searchLoan")
  }

}
