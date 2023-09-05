import {Entity, model, property} from '@loopback/repository';

@model()
export class Archivo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  consecutivo: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_publicacion: string;

  @property({
    type: 'string',
    required: true,
  })
  url_archivo: string;


  constructor(data?: Partial<Archivo>) {
    super(data);
  }
}

export interface ArchivoRelations {
  // describe navigational properties here
}

export type ArchivoWithRelations = Archivo & ArchivoRelations;
