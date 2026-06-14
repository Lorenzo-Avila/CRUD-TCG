import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login-service';
import { FirebaseError } from '@angular/fire/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  usuario!: string;
  senha!: string;
  errou!: string;

  constructor(private loginService: LoginService, private route:Router) {}

  async entrar() {
    try {
     await this.loginService.login(this.usuario, this.senha);
     this.route.navigate(['admin/home']);
     
    } catch (e: any){
      console.log('o erro é:', e.code);
      this.errou = 'Falha na autenticação: ';
      this.errou += this.getErrorMessage(e.code);
    }
  }
getErrorMessage(codigo:string){
  switch (codigo){

    case 'auth/invalid-email' :
      return 'Endereço de email invalido';
    case 'auth/invalid-credential':
      return 'Usuário ou senha inválidos';
  }
  return '';
}

}
