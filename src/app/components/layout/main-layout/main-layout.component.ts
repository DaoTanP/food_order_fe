import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../../models/user';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

  protected switchThemeFunction: any = undefined;
  protected isDark: boolean = false;
  protected isLoggedIn: boolean = false;
  protected user: Observable<User | undefined> = of(undefined);

  public toggleTheme(){

  }

  public logOut(){

  }
}
