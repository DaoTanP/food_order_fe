import { Component } from '@angular/core';

@Component({
  selector: 'app-food-search',
  templateUrl: './food-search.component.html',
  styleUrl: './food-search.component.css'
})
export class FoodSearchComponent {
  page:number = 1;
  itemsPerPage:number = 4;
}
