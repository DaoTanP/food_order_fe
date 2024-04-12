import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent
{
  @Input() items: any[] | null = [
    { title: 'Kem Xôi', description: 'Kem Xôi SiuNgon', image: '' },


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
