import { Usuario } from './usuario.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsuarioService {
  private usuarios: Array<Usuario> = [
    {
      id: 1,
      nomeDeUsuario: 'ravier',
      email: 'ravier@alura.com.br',
      senha: '1234',
      nomeCompleto: 'Ravier de Oliveira',
      dataDeEntrada: new Date(),
    },
  ];

  public cria(usuario: Usuario): Usuario {
    this.usuarios.push(usuario);

    return usuario;
  }
  public buscaPorNomeDeUsuario(nomeDeUsuario: string): Usuario {
    return this.usuarios.find(usuario => usuario.nomeDeUsuario === nomeDeUsuario);
  }
}
