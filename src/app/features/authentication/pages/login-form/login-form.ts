import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { email, form, minLength, required, Field } from '@angular/forms/signals';
import { UserApi } from '../../../../core/services/user-api';
import { Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { ILoginParams } from '../../models/login-params';
import { setErrorMessage } from '../../../../shared/utils/set-error-message';

@Component({
  selector: 'app-login-form',
  imports: [Field],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  private readonly _userApi = inject(UserApi);
  private readonly _router = inject(Router);

  loginModel = signal({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel, (fieldPath) => {
    required(fieldPath.email, { message: 'O Email é obrigatório' });
    email(fieldPath.email, { message: ' O E-mail está inválido' });

    required(fieldPath.password, { message: 'A Senha é obrigatória' });
    minLength(fieldPath.password, 8, { message: 'A Senha deve ter no mínimo 8 caracteres' });
  });

  loginParams = signal<ILoginParams | undefined>(undefined);

  loginResource = rxResource({
    params: () => this.loginParams(),
    stream: ({ params }) =>
      this._userApi
        .login(params.email, params.password)
        .pipe(tap(() => this._router.navigate(['/explore']))),
  });

  loginError = computed(() => setErrorMessage(this.loginResource.error()));

  login() {
    const { email, password } = this.loginForm().value();
    this.loginParams.set({ email, password });
  }
}
