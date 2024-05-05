import { Component, Input, OnInit } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { Food } from '../../models/food';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService, AlertType } from '../../services/alert-service.service';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrl: './food-details.component.css'
})
export class FoodDetailsComponent implements OnInit {
  food:Food[]=[];
  page:number = 1;
  itemsPerPage:number = 4;
  totalFood:any;
  foodType!: string;

  constructor(
    private foodService: FoodService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService
    )
    {
    activatedRoute.paramMap.subscribe(params => {
      this.foodType = params.get('id') || '';
    })
   }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.foodService.getAll().subscribe((res:any)=>{
      this.food = res
    })
  }
  addToCart(item: Food){
    this.cartService.addToCart(item);
    this.alertService.appendAlert('Thêm vào giỏ hàng thành công', AlertType.success, 30, 'alert-container');

  }
}
