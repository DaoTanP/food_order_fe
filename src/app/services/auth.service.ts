import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { DataService } from './data.service';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  private user: Observable<User | undefined> = of(undefined);
  constructor(
    private httpService: HttpService,
    private dataService: DataService,
    private router: Router
  ) {}

  get isLoggedIn(): boolean {
    return this.dataService.getSession('accessToken') !== null;
  }

  get usersData(): Observable<any> {
    console.log('getting user data...');
    return this.user;
  }

  set usersData(userData: any) {
    this.user = of(userData);
  }

  login(accessToken: string): void {
    if (!accessToken) return;

    this.dataService.setSession('access_token', accessToken);
    this.user = this.httpService.getUserInfo();
  }

  logOut(): void {
    this.dataService.removeSession('access_token');
    this.user = of(undefined);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.isLoggedIn) {
      this.router.navigate(['login']);
    }
    return this.isLoggedIn;
  }
}
