import { Component, Input, OnInit } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { Food } from '../../models/food';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService, AlertType } from '../../services/alert-service.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrl: './food-details.component.css'
})
export class FoodDetailsComponent implements OnInit {
  food: Food[] = [];
  page: number = 1;
  itemsPerPage: number = 8;
  totalFood: any;
  foodCategory!: string | null;
  foodName!: string | null;

  constructor(
    private foodService: FoodService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private httpService: HttpService,
  ) {
    activatedRoute.paramMap.subscribe(params => {
      this.foodCategory = params.get('id');
      if (this.foodCategory) {
        this.httpService.getFoodByCategory(this.foodCategory).subscribe((res: Food[]) => {
          this.food = res
        })
      };
    });

    activatedRoute.queryParamMap.subscribe(params => {
      this.foodName = params.get('name');
      if (this.foodName) {
        this.httpService.searchFoodByName(this.foodName).subscribe((res: Food[]) => {
          this.food = res
        })
      };
    });
  }

  ngOnInit(): void {
    // this.getAll();
  }

  getAll() {
    this.foodService.getAll().subscribe((res: any) => {
      this.food = res
    })
  }

  addToCart(item: Food) {
    console.log(item);

    this.cartService.addToCart(item);
    this.alertService.appendAlert('Thêm vào giỏ hàng thành công', AlertType.success, 30, 'alert-container');
  }
}
