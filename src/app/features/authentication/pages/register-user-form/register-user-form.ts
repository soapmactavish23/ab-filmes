import { Component, signal } from '@angular/core';
import { email, Field, form, minLength, required } from '@angular/forms/signals';

@Component({
  selector: 'app-register-user-form',
  imports: [Field],
  templateUrl: './register-user-form.html',
  styleUrl: './register-user-form.css',
})
export class RegisterUserForm {
  registerModel = signal({
    name: '',
    email: '',
    password: '',
  });

  registerForm = form(this.registerModel, (fieldPath) => {
    required(fieldPath.name, { message: 'O Nome é obrigatório.' });

    required(fieldPath.email, { message: 'O E-mail é obrigatório' });
    email(fieldPath.email, { message: 'O E-mail está inválido' });

    required(fieldPath.password, { message: 'A senha é obrigatória' });
    minLength(fieldPath.password, 8, { message: 'A senha deve ter no mínimo 8 caracteres.' });
  });
}
