import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { Food } from '../../models/food';
import { CartService } from '../../services/cart.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  foodInCart: Food[] = [];
  get total() {
    return this.cartService.getTotal();
  }
  selectAll = false;

  constructor(private cartService: CartService, private dataService: DataService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.cartService.getAll().subscribe((res: Food[]) => {
      this.foodInCart = res
    })
  }

  increaseQuantity(item: Food) {
    this.cartService.increaseQuantity(item);
  }

  decreaseQuantity(item: Food) {
    this.cartService.decreaseQuantity(item);
  }

  removeFromCart(food: Food) {
    this.cartService.removeFromCart(food);
    this.updateSelectAll();
  }

  toggleSelectAll() {
    console.log(this.selectAll);
    if (this.selectAll) {
      this.foodInCart.forEach(f => {
        this.cartService.selectItem(f);
      });
    } else {
      this.foodInCart.forEach(f => {
        this.cartService.unselectItem(f);
      });
    }
    console.log(this.selectAll);
  }

  checkboxChanged(isChecked: boolean, food: Food) {
    if (isChecked) {
      this.cartService.selectItem(food);
      this.updateSelectAll();
    }
    else {
      this.cartService.unselectItem(food);
      this.selectAll = false;
    }
  }

  updateSelectAll() {
    this.selectAll = this.foodInCart.every(f => f.selected);
  }

  order() {
    const token = this.dataService.getSession('access_token');

    if (!token)
      console.log('Login Login');

  }
}
