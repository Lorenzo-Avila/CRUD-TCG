import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login-service';

export const authGuard: CanActivateFn = (route, state) => {

  const routes = inject(Router);
  const login = inject(LoginService);

  if(login.getUsuarioLogado()){
    return true;
  }else{
    routes.navigate([''])
  }

  console.log('canActivate');

  return false;
};
