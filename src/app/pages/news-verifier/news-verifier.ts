import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { NewsVerifierService, VerificacionResponse } from '../../service/news-verifier.service';

@Component({
  selector: 'app-news-verifier',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './news-verifier.html',
  styleUrls: ['./news-verifier.scss']
})
export class NewsVerifier {
  noticiaTexto = '';
  resultado?: VerificacionResponse;
  loading: boolean = false;
  

  constructor(
    private verifierService: NewsVerifierService,
    private cdr: ChangeDetectorRef
  ) {}

  verificar() {
    if (!this.noticiaTexto.trim()) return;

    this.loading = true;
    this.resultado = undefined;

    this.verifierService.verificarNoticia(this.noticiaTexto).subscribe({
      next: (res) => {
        this.resultado = res;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al verificar noticia', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  reiniciar() {
    // Limpiar el resultado y el texto para ingresar otra noticia
    this.noticiaTexto = '';
    this.resultado = undefined;
  }
}
