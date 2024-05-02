import { Component, Input } from '@angular/core';
import { privateDecrypt } from 'crypto';
import { url } from 'inspector';
import { AlertType } from '../../services/alert-service.service';
import { Food } from '../../models/food';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent
{
  @Input() foods: Food[] | null = [
    {
      id: 1,
      name: 'Mì Đặc Biệt VIP ( Có Thanh Cua hoặc Tôm )',
      description: 'Trứng, bò cá viên thanh cua hoặc thịt bằm tóp mỡ, rau xanh',
      price: 35000,
      quantity: 1,
      images: ['https://i.ytimg.com/vi/nVXgqGNRVtA/maxresdefault.jpg']
    },
    {
      id: 2,
      name: 'Cơm Tấm - Sườn Bì Chả',
      description: 'Sườn heo cốt lếch, chả trứng hấp, rau, mỡ hành',
      price: 50000,
      quantity: 1,
      images: ['https://tea-3.lozi.vn/v1/images/resized/com-tam-sa-bi-chuong-ha-noi-quan-dong-da-ha-noi-1681097569201834611-eatery-avatar-1681097569?w=640&type=s']
    },
    {
      id: 3,
      name: 'Phở',
      description: 'Phở tái/nạm',
      price: 45000,
      quantity: 1,
      images: ['https://giadinh.mediacdn.vn/zoom/740_463/2020/9/13/photo1600006283495-16000062834991179244544-crop-1600006327048196380539.jpg']
    },
    {
      id: 4,
      name: 'KFC Đùi - Combo',
      description: 'Miếng/đùi gà +  Khoai tây, nước uống',
      price: 63000,
      quantity: 1,
      images: ['https://images.foody.vn/res/g1/6192/prof/s640x400/image-051af749-220812160707.jpg']
    },
    {
      id: 5,
      name: 'Mì Cay Hàn Quốc',
      description: 'Mì cay',
      price: 65000,
      quantity: 1,
      images: ['https://cdn.tgdd.vn/Files/2019/09/24/1201263/2-cach-nau-mi-cay-hai-san-chuan-cong-thuc-han-quoc-202112301425006195.jpg']
    },
  ];
  mainConfig = {
    lazyLoad: 'ondemand',
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 250,
  }

  constructor(private cartService: CartService){}

  active = 0;

  slickInit (e: any)
  {
    console.log(e);
  }

  beforeChange (e: any)
  {
    this.active = e.currentSlide;
  }

  increaseQuantity(item: any){
    if(item.quantity != 0) {
      item.quantity += 1;
      item.total = item.price * item.quantity;
    }
  }

  decreaseQuantity(item: any){
    if(item.quantity != 1) {
      item.quantity -= 1;
      item.total = item.price * item.quantity;
    }
  }

  addToCart(item: Food){
    this.cartService.addToCart(item);
  }
}
