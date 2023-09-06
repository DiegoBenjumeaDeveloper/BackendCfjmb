import {Entity, model, property, hasMany} from '@loopback/repository';
import {Tipo} from './tipo.model';

@model()
export class Usuario extends Entity {
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
  correo: string;

  @property({
    type: 'number',
  })
  id_rol?: number;

  @hasMany(() => Tipo, {keyTo: 'id_usuario'})
  tipos: Tipo[];

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
