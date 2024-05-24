import { Component, Input } from '@angular/core';
import { privateDecrypt } from 'crypto';
import { url } from 'inspector';
import { AlertService, AlertType } from '../../services/alert-service.service';
import { Food } from '../../models/food';
import { CartService } from '../../services/cart.service';
import { map, Observable, of, switchMap } from 'rxjs';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent {
  protected foods$: Observable<Food[]>;
  mainConfig = {
    lazyLoad: 'ondemand',
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 250,
  };

  constructor(
    private cartService: CartService,
    private alertService: AlertService,
    private httpService: HttpService
  ) {
    this.foods$ = httpService.getAllFoods().pipe(
      map((res: Food[]) => {
        return res.sort(() => 0.5 - Math.random()).slice(0, 5);
      })
    );
  }

  active = 0;

  slickInit(e: any) {
    console.log(e);
  }

  beforeChange(e: any) {
    this.active = e.currentSlide;
  }

  addToCart(item: Food) {
    this.cartService.addToCart(item);
    this.alertService.appendAlert(
      'Thêm vào giỏ hàng thành công',
      AlertType.success,
      30,
      'alert-container'
    );
  }
}
