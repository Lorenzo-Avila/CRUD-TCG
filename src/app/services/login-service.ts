import { Injectable } from '@angular/core';

import {
  Auth,
  AuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private auth: Auth) {}

  login(usuario: string, senha: string) {
    return signInWithEmailAndPassword(this.auth, usuario, senha);
  }

  async criarNovoUsuario(nome: string, email: string, senha: string) {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, senha);
    updateProfile(userCredential.user, { displayName: nome });
    return userCredential.user;
  }

  getUsuarioLogado(){
    return this.auth.currentUser;
  }
}
