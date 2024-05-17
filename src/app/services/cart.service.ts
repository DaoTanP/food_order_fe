import { Injectable } from '@angular/core';
import { Food } from '../models/food';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private foodInCart: Food[] = [];
  private total: number = 0;

  constructor() { }

  getAll() {
    return of(this.foodInCart);
  }

  addToCart(foodToAdd: Food) {
    const food: Food = { ...foodToAdd, quantity: 1, selected: false };

    const index = this.foodInCart.findIndex((x) => x.itemId === food.itemId);
    if (index !== -1) {
      const foodToUpdate = this.foodInCart[index];
      foodToUpdate.quantity += food.quantity;
      this.updateTotal();
      return;
    }

    this.foodInCart.push(food);
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
