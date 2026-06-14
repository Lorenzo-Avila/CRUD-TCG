import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cartas } from '../../../../model/cartas';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CartasService } from '../../../../services/cartas-service';

@Component({
  selector: 'app-cartas-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
  ],
  templateUrl: './cartas-form.html',
  styleUrl: './cartas-form.scss',
})
export class CartasForm {
  form = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    preco: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
    colecao: new FormControl<string>('', [Validators.required]),
    raridade: new FormControl<string>('', [Validators.required]),
    estoque: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
    imagem: new FormControl<string>('', []),
  });

  constructor(private cartasService: CartasService) {}

  salvar() {
    this.form.markAllAsTouched();
    
    if (this.form.valid) {
      const carta: Cartas = {
        nome: this.form.value.nome!,
        colecao: this.form.value.colecao!,   
        raridade: this.form.value.raridade!, 
        preco: Number(this.form.value.preco), 
        estoque: Number(this.form.value.estoque), 
        foto: this.form.value.imagem!, // Verifique o nome exato no seu Model
      };

      // Gerenciando a Promise do Firebase
      this.cartasService.salvarCartas(carta)
        .then(() => {
          alert('Carta de Pokémon salva com sucesso!'); // Pode ser substituído por MatSnackBar depois
          this.form.reset(); // Limpa a tela para um novo cadastro
        })
        .catch((erro) => {
          console.error('Falha ao registrar a carta no banco de dados:', erro);
        });
    }
  }
