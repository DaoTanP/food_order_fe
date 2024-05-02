import { Component, Input, OnInit } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { Food } from '../../models/food';

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

  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.foodService.getAll().subscribe((res:any)=>{
      this.food = res
    })
  }
}
