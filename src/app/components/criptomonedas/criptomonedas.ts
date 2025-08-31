import { Component, OnInit, OnDestroy } from '@angular/core';
import { CryptoService } from '../../service/crypto.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-criptomonedas',
  imports: [CommonModule],
  templateUrl: './criptomonedas.html',
  styleUrls: ['./criptomonedas.scss']
})
export class Criptomonedas implements OnInit, OnDestroy {
  Math = Math;

  cryptos: any[] = [];
  loading = true;
  private timerInterval: any;

  constructor(private cryptoService: CryptoService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    // Llamada inicial para cargar criptomonedas al abrir la página
    this.cargarCriptos();

    // Actualización periódica, por ejemplo cada 60 segundos
    this.timerInterval = setInterval(() => {
      this.cargarCriptos();
    }, 10000); // 60000 ms = 1 minuto
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  private cargarCriptos(): void {
    this.loading = true;
    this.cryptoService.getCryptos().subscribe({
      next: (data) => {
        this.cryptos = data;
        this.loading = false;
        this.cdr.detectChanges(); // Forzar actualización de la vista
      },
      error: (err) => {
        console.error('Error al cargar criptomonedas:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

}