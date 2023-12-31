import {Entity, model, property, hasMany} from '@loopback/repository';
import {Rol} from './rol.model';

@model()
export class Admin extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  cargo: string;

  @hasMany(() => Rol, {keyTo: 'id_admin'})
  rols: Rol[];

  constructor(data?: Partial<Admin>) {
    super(data);
  }
}

export interface AdminRelations {
  // describe navigational properties here
}

export type AdminWithRelations = Admin & AdminRelations;
