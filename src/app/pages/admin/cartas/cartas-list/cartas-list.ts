import { Component, OnInit } from '@angular/core';
import { cartasService } from '../../../../services/cartas-service';
import { Cartas } from '../../../../model/cartas';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cartas-list',
  imports: [MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './cartas-list.html',
  styleUrl: './cartas-list.scss',
})
export class cartasList implements OnInit {
  cartas: Cartas[] = [];
  loading = true;
  constructor(private service: cartasService) {}

  ngOnInit() {
    this.service.listar().subscribe((resposta) => {
      this.loading = false;
      //this.cartas = resposta;
    });
  }
}