import { Injectable } from '@angular/core';
import { Food } from '../models/food';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

  const httpOptions = {
    headers:new HttpHeaders({'Content-Type':'Application/json'})
  }
const API_FOOD = 'http://localhost:3000/food';

  @Injectable({
    providedIn: 'root'
  })
  export class FoodService {

    constructor(private httpClient:HttpClient) { }

    getAll():Observable<Food[]>{
      return this.httpClient.get<Food[]>(API_FOOD).pipe(
      )
    }
  }

