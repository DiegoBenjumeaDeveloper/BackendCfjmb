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
  Usuario,
  Tipo,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioTipoController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/tipos', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Tipo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tipo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Tipo>,
  ): Promise<Tipo[]> {
    return this.usuarioRepository.tipos(id).find(filter);
  }

  @post('/usuarios/{id}/tipos', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tipo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tipo, {
            title: 'NewTipoInUsuario',
            exclude: ['id'],
            optional: ['id_usuario']
          }),
        },
      },
    }) tipo: Omit<Tipo, 'id'>,
  ): Promise<Tipo> {
    return this.usuarioRepository.tipos(id).create(tipo);
  }

  @patch('/usuarios/{id}/tipos', {
    responses: {
      '200': {
        description: 'Usuario.Tipo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tipo, {partial: true}),
        },
      },
    })
    tipo: Partial<Tipo>,
    @param.query.object('where', getWhereSchemaFor(Tipo)) where?: Where<Tipo>,
  ): Promise<Count> {
    return this.usuarioRepository.tipos(id).patch(tipo, where);
  }

  @del('/usuarios/{id}/tipos', {
    responses: {
      '200': {
        description: 'Usuario.Tipo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Tipo)) where?: Where<Tipo>,
  ): Promise<Count> {
    return this.usuarioRepository.tipos(id).delete(where);
  }
}
