import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { CartasService } from '../../services/cartas-service';
import { Cartas } from '../../model/cartas';

@Component({
  selector: 'app-cartas-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './cartas-list.component.html',
  styleUrls: ['./cartas-list.component.scss']
})
export class CartasListComponent implements OnInit {
  cartas$!: Observable<Cartas[]>;
  
  // Define quais colunas serão exibidas na tabela e a ordem delas
  colunasExibidas: string[] = ['nome', 'colecao', 'raridade', 'preco', 'estoque', 'acoes'];

  constructor(private cartasService: CartasService) {}

  ngOnInit() {
    // Carrega a lista do Firebase assim que a tela abre
    this.cartas$ = this.cartasService.listar();
  }

  excluir(id: string) {
    if (confirm('Tem certeza que deseja excluir esta carta do estoque?')) {
      this.cartasService.excluirCarta(id)
        .then(() => alert('Carta removida com sucesso!'))
        .catch(err => console.error('Erro ao remover', err));
    }
  }
}