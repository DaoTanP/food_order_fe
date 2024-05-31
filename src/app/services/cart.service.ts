import { Injectable } from '@angular/core';
import { Food } from '../models/food';
import { Observable, of, switchMap } from 'rxjs';
import { Cart } from '../models/cart';
import { HttpService } from './http.service';
import { AddToCartDTO } from '../models/dto/add-to-cart.dto';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private foodInCart: Food[] = [];
  private total: number = 0;

  private cart!: Observable<Cart>;

  constructor(private httpService: HttpService) {
    this.cart = httpService.getCart();
  }

  getAll() {
    return this.cart;
  }

  addToCart(foodToAdd: Food) {
    return this.cart.pipe(
      switchMap((cart) => {
        return this.httpService.addToCart(
          new AddToCartDTO(foodToAdd.itemId, 1)
        );
      })
    );
  }

  removeFromCart(food: Food) {
    const index = this.foodInCart.findIndex((x) => x.itemId === food.itemId);

    this.foodInCart.splice(index, 1);
    this.updateTotal();
  }

  selectItem(food: Food) {
    const f: Food | undefined = this.foodInCart.find(
      (x) => x.itemId === food.itemId
    );
    if (f) {
      f.selected = true;
      this.updateTotal();
    }
  }

  unselectItem(food: Food) {
    const f: Food | undefined = this.foodInCart.find(
      (x) => x.itemId === food.itemId
    );
    if (f) {
      f.selected = false;
      this.updateTotal();
    }
  }

  increaseQuantity(food: Food) {
    if (food.quantity != 0) {
      food.quantity += 1;
      this.updateTotal();
    }
  }

  decreaseQuantity(food: Food) {
    if (food.quantity != 1) {
      food.quantity -= 1;
      this.updateTotal();
    }
  }

  getTotal() {
    return this.total;
  }

  updateTotal() {
    this.total = 0;
    this.foodInCart.forEach((food: Food) => {
      if (food.selected) this.total += food.price * food.quantity;
    });
  }
}
