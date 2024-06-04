import { Injectable } from '@angular/core';
import { Food } from '../models/food';
import { BehaviorSubject, Observable, map, of, switchMap } from 'rxjs';
import { Cart } from '../models/cart';
import { HttpService } from './http.service';
import { AddToCartDTO } from '../models/dto/add-to-cart.dto';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // private foodInCart: Food[] = [];
  private selectedItemIds: number[] = [];
  private total: number = 0;

  private cart!: Observable<Cart>;
  private subject!: BehaviorSubject<Cart>;

  constructor(private httpService: HttpService) {
    this.subject = new BehaviorSubject<Cart>(new Cart([]));
    this.cart = this.subject.asObservable();
    this.refreshCart();
  }

  getAll() {
    return this.cart;
  }

  getValue() {
    return this.subject.value;
  }

  itemExistsInCart(food: Food) {
    const cartItems = this.getValue().cartItems;
    const i = cartItems.findIndex((item) => item.item.itemId === food.itemId);

    if (i > -1)
      // return id of cart item if exists
      return cartItems[i].id;

    return -1;
  }

  refreshCart() {
    this.httpService.getCart().subscribe((response) => {
      this.subject.next(response);
    });
  }

  addToCart(foodToAdd: Food) {
    const cartItemId = this.itemExistsInCart(foodToAdd);
    if (cartItemId > -1) {
      return this.increaseQuantity(cartItemId);
    }

    return this.httpService
      .addToCart(new AddToCartDTO(foodToAdd.itemId, 1))
      .pipe(
        map((res) => {
          this.refreshCart();
          return res;
        })
      );
  }

  removeFromCart(cartItemId: number) {
    return this.httpService.removeFromCart(cartItemId).pipe(
      map((res) => {
        this.refreshCart();
        const i = this.selectedItemIds.findIndex((id) => id === cartItemId);
        if (i > 0) this.selectedItemIds.splice(i, 1);
        return res;
      })
    );
  }

  increaseQuantity(cartItemId: number, quantity: number = 1) {
    const cartItem = this.getValue().cartItems.find(
      (cartItem) => cartItem.id === cartItemId
    );
    if (!cartItem) return of(null);

    quantity += cartItem.quantity;

    return this.httpService.updateQuantity(cartItemId, quantity).pipe(
      map((res) => {
        this.refreshCart();
        return res;
      })
    );
  }

  decreaseQuantity(cartItemId: number, quantity: number = 1) {
    const cartItem = this.getValue().cartItems.find(
      (cartItem) => cartItem.id === cartItemId
    );
    if (!cartItem) return of(null);

    quantity = cartItem.quantity - quantity;
    if (quantity < 1) return of(null);

    return this.httpService.updateQuantity(cartItemId, quantity).pipe(
      map((res) => {
        this.refreshCart();
        return res;
      })
    );
  }

  selectItem(cartItemId: number) {
    const cartItem = this.getValue().cartItems.find(
      (cartItem) => cartItem.id === cartItemId
    );

    if (!cartItem) return;

    this.selectedItemIds.push(cartItemId);
    this.updateTotal();
  }

  unselectItem(cartItemId: number) {
    const index = this.selectedItemIds.findIndex((id) => id === cartItemId);
    this.selectedItemIds.splice(index, 1);
    this.updateTotal();
  }

  getTotal() {
    return this.total;
  }

  updateTotal() {
    this.total = 0;
    const cartItems = this.getValue().cartItems;
    this.selectedItemIds.forEach((id) => {
      const item = cartItems.find((item) => item.id === id);
      if (!item) return;
      this.total += item.item.price * item.quantity;
    });
  }
}
