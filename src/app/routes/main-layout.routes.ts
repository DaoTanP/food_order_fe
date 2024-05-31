import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { CartComponent } from '../components/cart/cart.component';
import { FoodSearchComponent } from '../components/food-search/food-search.component';
import { FoodDetailsComponent } from '../components/food-details/food-details.component';
import { PaymentComponent } from '../components/payment/payment.component';
import { AuthGuard } from '../guards/auth.guard';

export const mainLayoutRoute: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'search', component: FoodSearchComponent },
  { path: 'food', component: FoodDetailsComponent },
  { path: 'food/:id', component: FoodDetailsComponent },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
];
