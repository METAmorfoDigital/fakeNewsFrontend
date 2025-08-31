import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Verificacion {
  noticiaTexto: string;
  veredicto: string;
  score: number;
  razonamiento: string;
  timestamp: number;
  verificacionHash: string;
  transactionHash: string;
  fechaVerificacion: number;
}

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getUltimaVerificacion(): Observable<Verificacion> {
    return this.http.get<Verificacion>(`${this.baseUrl}/ultima-verificacion`);
  }

  getTodasVerificaciones(): Observable<Verificacion[]> {
    return this.http.get<Verificacion[]>(`${this.baseUrl}/todas-verificaciones`);
  }
}
