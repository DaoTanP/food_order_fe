import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { RegisterDTO } from '../models/dto/register.dto';
import { DataService } from './data.service';
import { Food } from '../models/food';
import { Category } from '../models/category';
import { Cart } from '../models/cart';
import { AddToCartDTO } from '../models/dto/add-to-cart.dto';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private API_URL = 'http://localhost:8080';
  private USER_API_URL = 'http://localhost:8080/auth';
  constructor(
    private httpClient: HttpClient,
    private dataService: DataService
  ) {}

  login(user: User): Observable<any> {
    return this.httpClient.post(this.USER_API_URL + '/login', user);
  }

  register(user: RegisterDTO): Observable<any> {
    return this.httpClient.post(this.USER_API_URL + '/register', user);
  }

  usernameAvailable(username: string): Observable<any> {
    return this.httpClient.post(
      this.USER_API_URL + '/usernameAvailable',
      { username },
      { observe: 'response', responseType: 'text' }
    );
  }

  getUserInfo(): Observable<any> {
    return this.httpClient.get(this.API_URL + '/user/userinfo', {
      headers: {
        Authorization: 'Bearer ' + this.dataService.getSession('access_token'),
      },
    });
  }

  editUserInfo(userInfoChanges: any): Observable<any> {
    return this.httpClient.put(this.API_URL + '/user/update', userInfoChanges, {
      headers: {
        Authorization: 'Bearer ' + this.dataService.getSession('access_token'),
      },
    });
  }

  deleteUser(): Observable<any> {
    return this.httpClient.delete(this.USER_API_URL, {
      headers: {
        Authorization: 'Bearer ' + this.dataService.getSession('access_token'),
      },
      observe: 'response',
      responseType: 'text',
    });
  }

  uploadAvatar(image: any): Observable<any> {
    return this.httpClient.patch(this.USER_API_URL, image, {
      headers: {
        Authorization: 'Bearer ' + this.dataService.getSession('access_token'),
      },
    });
  }

  getFoodByCategory(category: string): Observable<Food[]> {
    return this.httpClient.get<Food[]>(
      this.API_URL + '/menu/viewbycategory/' + category
    );
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.API_URL + '/menu/category');
  }

  searchFoodByName(name: string): Observable<Food[]> {
    return this.httpClient.get<Food[]>(
      this.API_URL + '/menu/search?name=' + name
    );
  }

  getAllFoods(): Observable<Food[]> {
    return this.httpClient.get<Food[]>(this.API_URL + '/menu/viewall');
  }

  getCart(): Observable<Cart> {
    return this.httpClient.get<Cart>(this.API_URL + '/cart/viewcart', {
      headers: {
        Authorization: 'Bearer ' + this.dataService.getSession('access_token'),
      },
    });
  }

  addToCart(addToCartDto: AddToCartDTO): Observable<any> {
    return this.httpClient.post(
      this.API_URL + '/cart/addtocart',
      addToCartDto,
      {
        headers: {
          Authorization:
            'Bearer ' + this.dataService.getSession('access_token'),
        },
      }
    );
  }

  removeFromCart(cartItemId: number): Observable<any> {
    return this.httpClient.delete(
      this.API_URL + `/cart/removefromcart/${cartItemId}`,
      {
        headers: {
          Authorization:
            'Bearer ' + this.dataService.getSession('access_token'),
        },
      }
    );
  }

  updateQuantity(cartItemId: number, quantity: number): Observable<any> {
    return this.httpClient.put(
      this.API_URL + `/cart/updatequantity`,
      { id: cartItemId, quantity },
      {
        headers: {
          Authorization:
            'Bearer ' + this.dataService.getSession('access_token'),
        },
      }
    );
  }
}
