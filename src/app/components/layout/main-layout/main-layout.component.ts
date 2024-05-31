import { Component, HostListener } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { User } from '../../../models/user';
import { DataService } from '../../../services/data.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { Food } from '../../../models/food';
import { HttpService } from '../../../services/http.service';
import { Category } from '../../../models/category';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  protected isScrolled: boolean = false;
  protected user: Observable<User | undefined> = of(undefined);

  protected name: string = '';

  protected categories!: Observable<Category[]>;
  protected cartItemCount!: Observable<number>;

  get isLoggedIn() {
    return this.dataService.getSession('access_token') !== null;
  }

  constructor(
    private router: Router,
    private dataService: DataService,
    private authGuardService: AuthService,
    private cartService: CartService,
    private httpService: HttpService
  ) {
    this.user = authGuardService.userData;
    this.cartItemCount = this.cartService.getAll().pipe(
      map((cart) => {
        return cart.cartItems.length;
      })
    );
    this.categories = httpService.getCategories();
  }

  search() {
    this.router.navigate(['/food'], {
      queryParams: {
        name: this.name || '',
      },
    });
  }
}
