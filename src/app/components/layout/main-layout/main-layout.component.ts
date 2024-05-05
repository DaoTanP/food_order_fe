import { Component, HostListener } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../../models/user';
import { DataService } from '../../../services/data.service';
import { AuthGuardService } from '../../../services/auth-guard.service';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { Food } from '../../../models/food';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

  protected isScrolled: boolean = false;
  protected user: Observable<User | undefined> = of(undefined);

  protected searchInput: string = '';

  protected cartItems!: Observable<Food[]>;

  get isLoggedIn () { return this};

  constructor(
    // private router: Router,
    // private dataService: DataService,
    private authGuardService: AuthGuardService,
    private cartService: CartService)
  {
    this.user = authGuardService.userData;
    this.cartItems = this.cartService.getAll();
  }

}
