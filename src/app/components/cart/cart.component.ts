import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { Food } from '../../models/food';
import { CartService } from '../../services/cart.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { Cart } from '../../models/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cart!: Cart;
  get total() {
    return this.cartService.getTotal();
  }
  selectAll = false;

  constructor(
    private cartService: CartService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.cartService.getAll().subscribe((res: Cart) => {
      this.cart = res;
      console.log(res);
    });
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
      this.cart.cartItems.forEach((f) => {
        this.cartService.selectItem(f.item);
      });
    } else {
      this.cart.cartItems.forEach((f) => {
        this.cartService.unselectItem(f.item);
      });
    }
    console.log(this.selectAll);
  }

  checkboxChanged(isChecked: boolean, food: Food) {
    if (isChecked) {
      this.cartService.selectItem(food);
      this.updateSelectAll();
    } else {
      this.cartService.unselectItem(food);
      this.selectAll = false;
    }
  }

  updateSelectAll() {
    this.selectAll = this.cart.cartItems.every((f) => f.selected);
  }

  order() {
    // const token = this.dataService.getSession('access_token');
    // if (!this.auGuarService.isLoggedIn)
    //   this.router.navigate(['/login']);
  }
}
