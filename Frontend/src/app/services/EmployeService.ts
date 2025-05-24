import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  private apiUrl = 'http://localhost:8022/api/employes'; // adapte l’URL si besoin

  constructor(private http: HttpClient) {}

  getAllEmployes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createEmploye(employe: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, employe);
  }

  updateEmploye(id: number, employe: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, employe);
  }

  deleteEmploye(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
