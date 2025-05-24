import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8022/users';

  constructor(private http: HttpClient) {}

  signin(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signin`, data);
  }

  signup(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signup`, data);
  }
    isLoggedIn(): boolean {
      const token = sessionStorage.getItem('auth_token');
      return !!token;
    }

  getUserProfile(): Observable<any> {
    const token = sessionStorage.getItem('auth_token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.baseUrl}/profile`, { headers });
  }
  logout(): void {
  sessionStorage.removeItem('auth_token');
  }
 getUserRole(): string | null {
  const token = sessionStorage.getItem('auth_token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role; // "ADMIN" ou "USER"
  } catch (e) {
    console.error("Invalid token", e);
    return null;
  }
}



}
