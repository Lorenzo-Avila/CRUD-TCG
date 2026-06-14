import { Component, OnInit } from '@angular/core';
import { CartasService } from '../../../../services/cartas-service';
import { Cartas } from '../../../../model/cartas';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cartas-list',
  imports: [MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './cartas-list.html',
  styleUrl: './cartas-list.scss',
})
export class CartasList implements OnInit {
  cartas: Cartas[] = [];
  loading = true;
  constructor(private service: CartasService) {}

  ngOnInit() {
    this.service.listar().subscribe((resposta) => {
  this.loading = false;
  this.cartas = resposta; 
});
  }
}