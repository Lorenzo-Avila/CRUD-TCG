import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartasService } from '../../../../services/cartas-service';
import { Cartas } from '../../../../model/cartas';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cartas-list',
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
  ],
  templateUrl: './cartas-list.html',
  styleUrl: './cartas-list.scss',
})
export class CartasList implements OnInit {
  cartas: Cartas[] = [];
  loading = true;
  colunasExibidas: string[] = ['nome', 'colecao', 'raridade', 'preco', 'estoque', 'acoes'];

  constructor(private service: CartasService) {}

  ngOnInit() {
    this.service.listar().subscribe((resposta) => {
      this.loading = false;
      this.cartas = resposta;
    });
  }

  excluir(id: string) {
    if (confirm('Tem certeza que deseja excluir esta carta?')) {
      this.service.excluirCarta(id)
        .then(() => alert('Carta removida!'))
        .catch((err) => console.error('Erro ao remover:', err));
    }
  }
}