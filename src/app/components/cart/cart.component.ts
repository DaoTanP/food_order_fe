import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { Food } from '../../models/food';
import { CartService } from '../../services/cart.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { Cart } from '../../models/cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cart: Observable<Cart>;
  get total() {
    return this.cartService.getTotal();
  }
  selectAll = false;

  constructor(
    private cartService: CartService,
    private dataService: DataService,
    private router: Router
  ) {
    this.cart = this.cartService.getAll();
  }

  increaseQuantity(cartItemId: number) {
    this.cartService
      .increaseQuantity(cartItemId)
      .subscribe({ next: (res) => console.log, error: (err) => console.log });
  }

  decreaseQuantity(cartItemId: number) {
    this.cartService
      .decreaseQuantity(cartItemId)
      .subscribe({ next: (res) => console.log, error: (err) => console.log });
  }

  removeFromCart(cartItemId: number) {
    this.cartService
      .removeFromCart(cartItemId)
      .subscribe({ next: (res) => console.log, error: (err) => console.log });
  }

  toggleSelectAll(isSelectAll: boolean) {
    if (isSelectAll) {
      this.cartService.selectAll();
    } else {
      this.cartService.unselectAll();
    }
  }

  checkboxChanged(isChecked: boolean, cartItemId: number) {
    if (isChecked) {
      this.cartService.selectItem(cartItemId);
    } else {
      this.cartService.unselectItem(cartItemId);
    }
  }

  isItemSelected(cartItemId: number): boolean {
    return this.cartService.isItemSelected(cartItemId);
  }

  isEveryItemSelected(): boolean {
    return this.cartService.isEveryItemSelected();
  }

  isNoItemSelected(): boolean {
    return this.cartService.isNoItemSelected();
  }

  order() {
    // const token = this.dataService.getSession('access_token');
    // if (!this.auGuarService.isLoggedIn)
    //   this.router.navigate(['/login']);
  }
}
