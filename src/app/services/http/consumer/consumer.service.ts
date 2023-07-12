import { Injectable } from '@angular/core';
import { PGlobal } from '../../globales';
import { HttpService } from '../http.service';
import { IConsumer, IMessage } from './consumer.interface';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {

  private respuesta: IConsumer = new IConsumer();
  private global = new PGlobal;

  constructor(
    private http: HttpService
  ) { }

  /* Para obtener la configuracion de donde debe realizar las perticiones */
  async GetConfig(url: string) {
    return new Promise<IConsumer>((resolve, reject) => {
      this.http.get(url).subscribe({
        next: (v) => this.successResponse(v),
        error: (e) => resolve(this.errorResponse(e)),
        complete: () => resolve(this.respuesta)
      });
    })
  }

  /*Para listar registros. */
  async Get(url: string) {
    return new Promise<IConsumer>((resolve, reject) => {
      this.http.get(this.global.SRV + url).subscribe({
        next: (v) => this.successResponse(v),
        error: (e) => resolve(this.errorResponse(e)),
        complete: () => resolve(this.respuesta)
      });
    })
  }

  // /* Prara guardar registros u hacer cualquier proceso indicado por el api que requiera post */
  async Post(url: string, data: any) {
    return new Promise<IConsumer>((resolve, reject) => {
      this.http.post(this.global.SRV + url, data).subscribe({
        next: (v) => this.successResponse(v),
        error: (e) => resolve(this.errorResponse(e)),
        complete: () => resolve(this.respuesta)
      });
    })
  }

  /* para Actualizar registros */
  async Update(url: string, data: any) {
    return new Promise<IConsumer>((resolve, reject) => {
      this.http.update(this.global.SRV + url, data).subscribe({
        next: (v) => this.successResponse(v),
        error: (e) => resolve(this.errorResponse(e)),
        complete: () => resolve(this.respuesta)
      });
    })
  }


  /* Para ELIMINAR registros */
  async Delete(url: string) {
    return new Promise<IConsumer>((resolve, reject) => {
      this.http.delete(this.global.SRV + url).subscribe({
        next: (v) => this.successResponse(v),
        error: (e) => resolve(this.errorResponse(e)),
        complete: () => resolve(this.respuesta)
      });
    })
  }

  /* Si la respuesta de la peticiones correcta se arma la respuesta de la siguiente manera */
  private successResponse(data: any): IConsumer {
    this.respuesta.data = data;
    this.respuesta.success = true;

    return this.respuesta;
  }

  /* Si la respuesta es error se valida y muestra texto legible paa el usuario. */
  private errorResponse(data: any): IConsumer {
    console.error(data);
    this.respuesta.message = this.erroAction(data);
    this.respuesta.success = false;

    return this.respuesta;
  }

  /* Textos de errores. */
  private erroAction(error: any): IMessage {
    let msg: IMessage = new IMessage;
    msg.title = 'Ocurrió un error'

    switch (error.status) {
      case 404:
        msg.message = `Error ${error.status}. La URL solicitada no se encontró en este servidor (${error.url})`;
        break;
      case 405:
        msg.message = `Error ${error.status}. Método no permitido (${error.url})`;
        break;
      case 401:
        msg.message = `Error ${error.status}. Se deniega el acceso a este recurso (${error.url}).`;
        break;
      case 403:
        msg.message = `Error ${error.status}. No tiene permiso para obtener esta página del servidor. (${error.url}).`;
        break;
      default:
        msg.message = error.message
        break;
    }

    return msg;
  }

}


