
// src/app/services/verificacion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Verificacion {
  noticiaTexto: string;
  veredicto: string;
  score: number;
  razonamiento: string;
  transactionHash: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class VerificacionService {
  private apiUrl = 'http://localhost:3000/api/ultima-verificacion'; // endpoint del backend

  constructor(private http: HttpClient) {}

  getUltimaVerificacion(): Observable<Verificacion> {
    return this.http.get<Verificacion>(this.apiUrl);
  }
}
