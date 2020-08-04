import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './_services/auth.service';

import {JwtHelperService} from '@auth0/angular-jwt';
import { TokenStorageService } from './_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private jwtHelper: JwtHelperService,
              private tokenStorageService: TokenStorageService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLogin(state.url);
   }

 checkLogin(url: string): boolean {
  if (!this.jwtHelper.isTokenExpired(this.tokenStorageService.getToken())) {
    return true;
}
  this.router.navigate(['/login']);
  return false;
}

}
