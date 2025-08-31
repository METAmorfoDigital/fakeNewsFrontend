import { Component, OnInit } from '@angular/core';
import { BlockchainService, Verificacion } from '../../service/blockchain.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verified-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verified-news.html',
  styleUrls: ['./verified-news.scss']
})
export class VerifiedNews implements OnInit {
  ultima: Verificacion | null = null;
  mensaje: string | null = null;

  constructor(private blockchainService: BlockchainService) {}

  ngOnInit(): void {
    this.blockchainService.getUltimaVerificacion().subscribe({
      next: (res) => {
        if ((res as any).noticiaTexto) {
          this.ultima = res as Verificacion;
          this.mensaje = null;
        } else {
          this.ultima = null;
          this.mensaje = (res as any).mensaje || 'No hay verificaciones todavía';
        }
      },
      error: (err) => {
        console.error(err);
        this.ultima = null;
        this.mensaje = 'Error al cargar la última verificación';
      }
    });
  }
}
