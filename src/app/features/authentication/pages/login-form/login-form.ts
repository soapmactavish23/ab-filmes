import { Component, signal } from '@angular/core';
import { email, form, minLength, required, Field } from '@angular/forms/signals';

@Component({
  selector: 'app-login-form',
  imports: [Field],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
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
}
