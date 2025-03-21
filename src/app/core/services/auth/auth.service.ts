import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{

  private readonly _httpClient = inject(HttpClient)

  constructor() { }

  sendRegisterData(data:object): Observable<any>
  {
    return this._httpClient.post(`${environment.signUrl}signUp`, data)
  }

  sendLoginData(data: object): Observable<any>
  {
    return this._httpClient.post(`${environment.signUrl}signIn`, data)
  }


}
