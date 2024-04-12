import { Routes } from "@angular/router";
import { HomeComponent } from "../components/home/home.component";
import { ProfileComponent } from "../components/profile/profile.component";
import { CartComponent } from "../components/cart/cart.component";

export const mainLayoutRoute: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'cart', component: CartComponent},
    { path: 'home', component: HomeComponent},
    { path: 'profile', component: ProfileComponent},
]
