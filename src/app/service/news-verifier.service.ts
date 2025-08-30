import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface VerificacionResponse {
  veredicto: string;
  score: number;
  razonamiento: string;
  fuenteCoincidente: string | null;
  
}

@Injectable({
  providedIn: 'root'
})
export class NewsVerifierService {
  // URL base del backend
  private baseUrl = 'http://localhost:3000';


  constructor(private http: HttpClient) {}

  /**
   * Envía la noticia al backend para ser verificada por la IA
   * @param noticiaTexto Texto de la noticia
   * @returns Observable con la respuesta de la IA
   */
  verificarNoticia(noticiaTexto: string): Observable<VerificacionResponse> {
    return this.http.post<VerificacionResponse>(
      `${this.baseUrl}/verificar`,
      { noticiaTexto } // debe coincidir exactamente con lo que el backend espera
    );
  }
}
