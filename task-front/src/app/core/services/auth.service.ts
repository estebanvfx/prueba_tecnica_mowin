import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:3000/api/v1/';
  private tokenKey = 'authToken';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router
  ) { }


  login(email: string, password: string): Observable<any> {
    return this.httpClient.post<any>((this.API_URL+"auth/login"), { email, password }).pipe(
      tap(response =>{
        if (response.access_token) {
          console.log("token guardado desde auth service");
          this.setToken(response.access_token);
        }
      })
    );
  }

  register(name: string, email: string, password: string): Observable<any>{
    return this.httpClient.post<any>((this.API_URL+"auth/register"), { name, email, password }).pipe(
      tap(response => {
        if(response.status === 201){
          console.log("usuario creado con exito")
        }
      })
    );
  }

  logout(): void{
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  private setToken(token: string){
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null{
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean{
    const token = this.getToken();
    if (!token) {
      return false;
    }

    const paylaod = JSON.parse(atob(token.split('.')[1]));
    const exp = paylaod.exp * 1000;
    return Date.now() < exp;
  }
}
