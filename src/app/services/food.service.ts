import { Injectable } from '@angular/core';
import { Food } from '../models/food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll():Food[] {
    return[
      {
       _id: '1',
      title: 'Cơm Tấm',
      overview: 'Cơm Tấm ngon',
      images: [],
      price: 0,
      tags: 'Cơm',
      },
      {
        _id: '2',
       title: 'Bún',
       overview: 'Bún ngon',
       images: [],
       price: 0,
       tags: 'Bún',
       },

    ]
  }
}
