import { Component, Input } from '@angular/core';
import { privateDecrypt } from 'crypto';
import { url } from 'inspector';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent
{
  @Input() items: any[] | null = [
    { title: 'Mì Đặc Biệt VIP ( Có Thanh Cua hoặc Tôm )',
      description: 'Đùi gà trứng ốp la bò cá viên thanh cua thịt bằm tóp mỡ',
      price: '35,000 VNĐ',
      image: 'https://food-cms.grab.com/compressed_webp/merchants/5-C4JTGCAJTBVUVE/hero/cbbfe03a-fe07-4aa8-9196-7719e726e34b__store_cover__2023__10__19__21__46__16.webp'
    },
    { title: 'Cơm Tấm sườn bì chả',
      description: 'Sườn heo cốt lếch, chả trứng hấp, rau, mỡ hành',
      price: '50,000 VNĐ',
      image: 'https://food-cms.grab.com/compressed_webp/merchants/5-C3VYRBDTGXJXCA/hero/45c723c2d78d421ba1411ac2cfb59f0e_1668371883720229757.webp' },
    { title: 'Phở',
      description: 'Phở tái/nạm',
      price: '45,000 VNĐ',
      image: 'https://food-cms.grab.com/compressed_webp/merchants/5-C3MDWB5AL6KVUE/hero/b243eb67ae3d4b37ac350993f37ff432_1658094501673001920.webp'
    },
    { title: 'KFC Đùi - Combo',
      description: 'Miếng/đùi gà +  Khoai tây, nước uống',
      price: '63,000 VNĐ',
      image: 'https://food-cms.grab.com/compressed_webp/merchants/5-C3TYAU51EYM1JA/hero/398ef14332a84fa3b34034f753dea761_1691032150229147318.webp'
    },
    { title: 'Mì Cay Seoul',
      description: 'Mì cay',
      price: '65,000 VNĐ',
      image: 'https://food-cms.grab.com/compressed_webp/merchants/VNGFVN000007yp/hero/800e33e120804e4b971f616fa379a954_1593535200647284169.webp'
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
  active = 0;

  slickInit (e: any)
  {
    console.log(e);
  }

  beforeChange (e: any)
  {
    this.active = e.currentSlide;
  }
}
