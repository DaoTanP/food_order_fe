import { Component, Input } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { catchError, Observable, of } from 'rxjs';
import { Category } from '../../models/category';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.component.html',
  styleUrl: './food-menu.component.css'
})
export class FoodMenuComponent {
  public categories: Observable<Category[]>;
  public error?: string;

  constructor(private httpService: HttpService) {
    this.categories = httpService.getCategories().pipe(
      catchError((error: HttpErrorResponse) => {
        this.error = error.message;
        return of([]);
      }
      ));
  }
}
