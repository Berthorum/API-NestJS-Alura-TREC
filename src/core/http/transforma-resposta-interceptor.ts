import { NestResponse } from '../http/nest-response';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';

@Injectable()
export class TransformaRespostaInterceptor implements NestInterceptor {
  private httpAdapter: AbstractHttpAdapter;

  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((respostadoControlador: NestResponse) => {
        if (respostadoControlador instanceof NestResponse) {
          const contexto = context.switchToHttp();
          const response = contexto.getResponse();
          const { headers, body, status } = respostadoControlador;

          const nomeDosCabecalhos = Object.getOwnPropertyNames(headers);

          nomeDosCabecalhos.forEach(nomeDoCabecalho => {
            const valorDoCabealho = headers[nomeDoCabecalho];
            this.httpAdapter.setHeader(
              response,
              nomeDoCabecalho,
              valorDoCabealho,
            );
          });

          this.httpAdapter.status(response, status);

          return body;
        }

        return respostadoControlador;
      }),
    );
  }
}
