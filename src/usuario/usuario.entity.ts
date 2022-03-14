import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { IsNomeDeUsuarioUnico } from './is-nome-de-usuario-unico.validator';

export class Usuario {
  id: number;

  @Expose({
    name: 'username'
  })
  @IsNomeDeUsuarioUnico({
    message: 'Nome de Usuário precisa ser único'
  })  
  @IsNotEmpty({
    message: 'Nome do Usuário é obrigatório.',
  })
  @IsString({
    message: 'Nome de Usuário precisa ser uma string.',
  })
  nomeDeUsuario: string;

  @Expose({
    name: 'email'
  })
  @IsEmail(
    {},
    {
      message: 'O Email precisa ser um endereço de email válido.',
    },
  )
  email: string;

  @Expose({
    name: 'password'
  })
  @Exclude({
    toPlainOnly: true
  })
  @IsNotEmpty({
    message: 'Senha é obrigatória.',
  })
  senha: string;

  @Expose({
    name: 'fullName'
  })
  @IsNotEmpty({
    message: 'Nome Completo é obrigatório.',
  })
  nomeCompleto: string;

  @Expose({
    name: 'joinDate'
  })  
  dataDeEntrada: Date;
}
