import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
    RouterLink,
  ],
  templateUrl: './cartas-form.html',
  styleUrl: './cartas-form.scss',
})
export class CartasForm implements OnInit {
  idEditando: string | null = null;

  form = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    preco: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
    colecao: new FormControl<string>('', [Validators.required]),
    raridade: new FormControl<string>('', [Validators.required]),
    estoque: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
    imagem: new FormControl<string>('', []),
  });

  constructor(
    private cartasService: CartasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.idEditando = this.route.snapshot.params['id'] || null;

    if (this.idEditando) {
      this.cartasService.buscarPorId(this.idEditando).then((docSnap) => {
        if (docSnap.exists()) {
          const carta = docSnap.data() as Cartas;
          this.form.patchValue({
            nome: carta.nome,
            colecao: carta.colecao,
            raridade: carta.raridade,
            preco: carta.preco,
            estoque: carta.estoque,
            imagem: carta.foto,
          });
        }
      });
    }
  }

  salvar() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const carta: Cartas = {
        nome: this.form.value.nome!,
        colecao: this.form.value.colecao!,
        raridade: this.form.value.raridade!,
        preco: Number(this.form.value.preco),
        estoque: Number(this.form.value.estoque),
        foto: this.form.value.imagem!,
      };

      if (this.idEditando) {
        this.cartasService.atualizarCarta(this.idEditando, carta)
          .then(() => {
            alert('Carta atualizada com sucesso!');
            this.router.navigate(['/admin/cartas']);
          })
          .catch((erro) => console.error('Erro ao atualizar:', erro));
      } else {
        this.cartasService.salvarCartas(carta)
          .then(() => {
            alert('Carta salva com sucesso!');
            this.router.navigate(['/admin/cartas']);  // <-- adiciona navegação
          })
          .catch((erro) => console.error('Erro ao salvar:', erro));
      }
    }
  }
}