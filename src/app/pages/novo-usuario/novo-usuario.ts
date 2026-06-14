import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-novo-usuario',
  imports: [FormsModule],
  templateUrl: './novo-usuario.html',
  styleUrl: './novo-usuario.scss',
})
export class NovoUsuario {
  nome:string = 'teste'; 
  email:string = 'prisciele@gmail.com';
  senha:string = '12345';
  mensagem!:string;

  constructor(private login:LoginService){}

async criarUsuario(){
  
  try{
   await this.login.criarNovoUsuario(this.nome, this.email, this.senha);
    console.log('Funcionou');

  }catch(erro:any){
    console.log('Não funcionou');
    this.mensagem = this.getErrorMessage(erro.code);
  }
}

getErrorMessage(codigo:string){
  switch (codigo){

    case 'auth/weak-password' :
      return 'A senha deve ter ao menos 6 caracteres';
    case 'auth/email-already-in-use':
      return 'O endereço do e-mail ja está em uso';
  }
  return 'Falha ao criar um novo usuário' + codigo;
}

}
