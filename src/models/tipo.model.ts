import {Entity, model, property, hasMany} from '@loopback/repository';
import {Archivo} from './archivo.model';

@model()
export class Tipo extends Entity {
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
  tipo_nombre: string;

  @property({
    type: 'number',
  })
  id_usuario?: number;

  @hasMany(() => Archivo, {keyTo: 'id_tipo'})
  archivos: Archivo[];

  constructor(data?: Partial<Tipo>) {
    super(data);
  }
}

export interface TipoRelations {
  // describe navigational properties here
}

export type TipoWithRelations = Tipo & TipoRelations;
