import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { SlickCarouselModule } from 'ngx-slick-carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';
import { CartComponent } from './components/cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FoodScrollListComponent } from './components/food-scroll-list/food-scroll-list.component';
import { FoodDetailsComponent } from './components/food-details/food-details.component';
import { FoodSearchComponent } from './components/food-search/food-search.component';
import { FoodMenuComponent } from './components/food-menu/food-menu.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BannerSliderComponent } from './components/banner-slider/banner-slider.component';
import { CardCategoryComponent } from './components/card-category/card-category.component';
import { MoreInfoComponent } from './components/more-info/more-info.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    PageNotFoundComponent,
    MainLayoutComponent,
    CartComponent,
    CarouselComponent,
    FoodScrollListComponent,
    FoodDetailsComponent,
    FoodSearchComponent,
    FoodMenuComponent,
    BannerSliderComponent,
    CardCategoryComponent,
    MoreInfoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SlickCarouselModule,
    NgxPaginationModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
