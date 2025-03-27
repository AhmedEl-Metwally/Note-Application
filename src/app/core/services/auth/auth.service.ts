import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{

  private readonly _httpClient = inject(HttpClient)
  private readonly _router = inject(Router)
  userDate: BehaviorSubject<any> = new BehaviorSubject('') 

  constructor() { }

  sendRegisterData(data:object): Observable<any>
  {
    return this._httpClient.post(`${environment.signUrl}signUp`, data)
  }

  sendLoginData(data: object): Observable<any>
  {
    return this._httpClient.post(`${environment.signUrl}signIn`, data)
  }


  saveUserToken()
  {
    if (localStorage.getItem("userToken"))
    {
      this.userDate.next(jwtDecode(localStorage.getItem("userToken")!))
    }
  }

  userSignOut()
  {
    localStorage.removeItem("userToken")
    this.userDate.next(null)
    this._router.navigate(['/login'])
  }




}
