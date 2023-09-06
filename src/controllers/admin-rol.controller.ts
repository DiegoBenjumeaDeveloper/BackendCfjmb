import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Admin,
  Rol,
} from '../models';
import {AdminRepository} from '../repositories';

export class AdminRolController {
  constructor(
    @repository(AdminRepository) protected adminRepository: AdminRepository,
  ) { }

  @get('/admins/{id}/rols', {
    responses: {
      '200': {
        description: 'Array of Admin has many Rol',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Rol)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Rol>,
  ): Promise<Rol[]> {
    return this.adminRepository.rols(id).find(filter);
  }

  @post('/admins/{id}/rols', {
    responses: {
      '200': {
        description: 'Admin model instance',
        content: {'application/json': {schema: getModelSchemaRef(Rol)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Admin.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rol, {
            title: 'NewRolInAdmin',
            exclude: ['id'],
            optional: ['id_admin']
          }),
        },
      },
    }) rol: Omit<Rol, 'id'>,
  ): Promise<Rol> {
    return this.adminRepository.rols(id).create(rol);
  }

  @patch('/admins/{id}/rols', {
    responses: {
      '200': {
        description: 'Admin.Rol PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rol, {partial: true}),
        },
      },
    })
    rol: Partial<Rol>,
    @param.query.object('where', getWhereSchemaFor(Rol)) where?: Where<Rol>,
  ): Promise<Count> {
    return this.adminRepository.rols(id).patch(rol, where);
  }

  @del('/admins/{id}/rols', {
    responses: {
      '200': {
        description: 'Admin.Rol DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Rol)) where?: Where<Rol>,
  ): Promise<Count> {
    return this.adminRepository.rols(id).delete(where);
  }
}
