import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { RegisterDTO } from '../models/dto/register.dto';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private API_URL = 'http://localhost:8080';
  private USER_API_URL = 'http://localhost:8080/auth';
  constructor(private httpClient: HttpClient, private dataService: DataService
  ) {}

  login (user: User): Observable<any>
  {
    return this.httpClient.post(this.USER_API_URL + '/login', user, /* { observe: 'response', responseType: "text" } */);
  }

  register (user: RegisterDTO): Observable<any>
  {
    return this.httpClient.post(this.USER_API_URL + '/register', user);
  }

  usernameAvailable (username: string): Observable<any>
  {
    return this.httpClient.post(this.USER_API_URL + "/usernameAvailable", { username }, { observe: 'response', responseType: "text" });
  }

  getUserInfo (): Observable<any>
  {
    return this.httpClient.get(this.API_URL + '/user/userinfo', { headers: {
    'Authorization': 'Bearer ' + this.dataService.getSession('access_token'),
      }
    });
  }

  editUserInfo (userInfoChanges: any): Observable<any>
  {
    return this.httpClient.patch(this.USER_API_URL, userInfoChanges, { headers: {
    'Authorization': 'Bearer ' + this.dataService.getSession('access_token'),
  } });
  }

  deleteUser (): Observable<any>
  {
    return this.httpClient.delete(this.USER_API_URL, { headers: {
    'Authorization': 'Bearer ' + this.dataService.getSession('access_token'),
  }, observe: 'response', responseType: "text" });
  }

  uploadAvatar (image: any): Observable<any>
  {
    return this.httpClient.patch(this.USER_API_URL, image, { headers: {
    'Authorization': 'Bearer ' + this.dataService.getSession('access_token'),
  } });
  }

}
