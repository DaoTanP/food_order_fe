import { Injectable } from '@angular/core';
import { Food } from '../models/food';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private foodInCart: Food[] = [];
  private selected: Food[] = [];
  private total: number = 0;

  constructor() { }

  getAll() {
    return of(this.foodInCart);
  }

  addToCart(food: Food) {
    const index = this.foodInCart.findIndex(x => x.id === food.id);
    if (index !== -1){
      const foodToUpdate = this.foodInCart[index];
      foodToUpdate.quantity += food.quantity;
      this.foodInCart.splice(index, 1, foodToUpdate);
      return;
    }

    this.foodInCart.push(food);
  }

  removeFromCart(food: Food) {
    const index = this.foodInCart.findIndex(x => x.id === food.id);
    this.foodInCart.splice(index, 1);
  }
}
