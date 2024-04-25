import { Routes } from "@angular/router";
import { HomeComponent } from "../components/home/home.component";
import { ProfileComponent } from "../components/profile/profile.component";
import { CartComponent } from "../components/cart/cart.component";
import { FoodSearchComponent } from "../components/food-search/food-search.component";
import { FoodDetailsComponent } from "../components/food-details/food-details.component";

export const mainLayoutRoute: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'cart', component: CartComponent},
    { path: 'home', component: HomeComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'search', component: FoodSearchComponent},
    { path: 'food', component: FoodDetailsComponent},
    { path: 'food/:id', component: FoodDetailsComponent},
]
