import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent {
  selectedCartItems: CartItem[] = [];
  total: Observable<number>;
  constructor(private cartService: CartService, private router: Router) {
    this.selectedCartItems = cartService.getSelectedItems();
    this.total = cartService.getTotal();
    if (this.selectedCartItems.length === 0) router.navigate(['cart']);
  }
}
