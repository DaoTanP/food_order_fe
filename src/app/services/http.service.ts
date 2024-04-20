import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private FOOD_API_URL = '';
  private USER_API_URL = '';
  dataService: any;
  constructor(private httpClient: HttpClient) {}

  public login (user: User): Observable<any>
  {
    return this.httpClient.post(this.USER_API_URL + '/login', user, /* { observe: 'response', responseType: "text" } */);
  }

  public register (user: User): Observable<any>
  {
    return this.httpClient.post(this.USER_API_URL + '/register', user);
  }

  public usernameAvailable (username: string): Observable<any>
  {
    return this.httpClient.post(this.USER_API_URL + "/usernameAvailable", { username }, { observe: 'response', responseType: "text" });
  }

  public getUserInfo (id: string = ''): Observable<any>
  {
    console.log('requesting user info');

    if (id != '')
      return this.httpClient.get(this.USER_API_URL, { headers: {
    'Authorization': 'Bearer ' + this.dataService.getSession('access_token'),
  } });

    return this.httpClient.get(this.USER_API_URL + '/' + id, { headers: {
    'Authorization': 'Bearer ' + this.dataService.getSession('access_token'),
  } });
  }

  public editUserInfo (userInfoChanges: any): Observable<any>
  {
    return this.httpClient.patch(this.USER_API_URL, userInfoChanges, { headers: {
    'Authorization': 'Bearer ' + this.dataService.getSession('access_token'),
  } });
  }

  public deleteUser (): Observable<any>
  {
    return this.httpClient.delete(this.USER_API_URL, { headers: {
    'Authorization': 'Bearer ' + this.dataService.getSession('access_token'),
  }, observe: 'response', responseType: "text" });
  }

  public uploadAvatar (image: any): Observable<any>
  {
    return this.httpClient.patch(this.USER_API_URL, image, { headers: {
    'Authorization': 'Bearer ' + this.dataService.getSession('access_token'),
  } });
  }

}
