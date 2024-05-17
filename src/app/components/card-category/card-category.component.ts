import { Component, Input } from '@angular/core';
import { Category } from '../../models/category';

@Component({
  selector: 'app-card-category',
  templateUrl: './card-category.component.html',
  styleUrl: './card-category.component.css',
})
export class CardCategoryComponent {
  @Input() category!: Category;
}
