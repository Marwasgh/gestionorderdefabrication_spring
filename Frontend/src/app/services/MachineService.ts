import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  private baseUrl = 'http://localhost:8022/api/machines';

  constructor(private http: HttpClient) { }

  /**
   * Récupère toutes les machines disponibles (état = "Disponible")
   */
  getAvailableMachines(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/disponibles`);
  }

}
