import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, take } from 'rxjs';
import { HttpService } from '../../services/http.service';
import { Food } from '../../models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent
{
  protected searchInput: string = '';
  protected topBorrowList: Observable<any> = of([]);
  protected randomRecommendationList: Observable<any> = of([]);
  protected carouselItems: any[] | null = null;

  constructor(private httpService: HttpService, private router: Router)
  {

  }

  search ()
  {
    if (!this.searchInput || this.searchInput === '')
      return;
    this.router.navigate(['/search'], { queryParams: { title: this.searchInput } });
  }

}
