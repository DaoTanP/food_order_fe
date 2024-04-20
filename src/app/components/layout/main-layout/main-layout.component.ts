import { Component, HostListener } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../../models/user';
import { DataService } from '../../../services/data.service';
import { AuthGuardService } from '../../../services/auth-guard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

  protected switchThemeFunction: any = undefined;
  protected setThemeFunction: any = undefined;
  protected getThemeFunction: any = undefined;
  protected isDark: boolean = false;
  protected isScrolled: boolean = false;
  protected user: Observable<User | undefined> = of(undefined);

  protected searchInput: string = '';

  get isLoggedIn () { return this};

  constructor(private dataService: DataService, private authGuardService: AuthGuardService, private router: Router)
  {
    // this.switchThemeFunction = this.dataService.getData('switchTheme');
    // this.setThemeFunction = this.dataService.getData('setTheme');
    // this.getThemeFunction = this.dataService.getData('getTheme');

    this.user = authGuardService.userData;
  }


  toggleTheme ()
  {

  }

}
