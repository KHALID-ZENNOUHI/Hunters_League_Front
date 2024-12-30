// auth.service.ts

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { loginSuccess, logout } from '../../store/user/user.actions';
import { UserState } from '../../store/user/user.state';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth/';
  user$ : Observable<UserState> = this.store.select('user');
  
  constructor(
    private http: HttpClient,
    private store: Store<{user: UserState}>,
  ) { }

  login(credentials: { username: string; password: string }): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
  
    const params = new HttpParams().set('withCredentials', 'true');
  
    return this.http.post<string>(`${this.baseUrl}login`, credentials, {
      headers,
      params,
      responseType: 'text' as 'json'
    }).pipe(
      tap((jwtToken: string) => {
        if (jwtToken) {
          this.saveTokens(jwtToken, '');
            const payload = this.decodeJWT(jwtToken);
          if (payload) {
            this.store.dispatch(loginSuccess({
              id: payload.id,
              username: payload.username,
              role: payload.role,
            }));
          }
        }
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}register`, userData).pipe(
      tap({
        next: () => console.log('Registration Successful', 'You can now log in'),
        error: () => console.log('Registration Failed', 'Please check your details and try again'),
      }),
    );
  }
  
  private decodeJWT(token: string): any {
    try {
      const payload = token.split('.')[1]; 
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Failed to decode JWT', error);
      return null;
    }
  }
  
  private saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.store.dispatch(logout());
  }

  isAuthenticated(): boolean {
    return !!this.user$.forEach((user) => user.isAuthenticated);
  }
}
