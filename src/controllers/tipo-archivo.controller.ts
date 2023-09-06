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
  Tipo,
  Archivo,
} from '../models';
import {TipoRepository} from '../repositories';

export class TipoArchivoController {
  constructor(
    @repository(TipoRepository) protected tipoRepository: TipoRepository,
  ) { }

  @get('/tipos/{id}/archivos', {
    responses: {
      '200': {
        description: 'Array of Tipo has many Archivo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Archivo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Archivo>,
  ): Promise<Archivo[]> {
    return this.tipoRepository.archivos(id).find(filter);
  }

  @post('/tipos/{id}/archivos', {
    responses: {
      '200': {
        description: 'Tipo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Archivo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tipo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Archivo, {
            title: 'NewArchivoInTipo',
            exclude: ['id'],
            optional: ['id_tipo']
          }),
        },
      },
    }) archivo: Omit<Archivo, 'id'>,
  ): Promise<Archivo> {
    return this.tipoRepository.archivos(id).create(archivo);
  }

  @patch('/tipos/{id}/archivos', {
    responses: {
      '200': {
        description: 'Tipo.Archivo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Archivo, {partial: true}),
        },
      },
    })
    archivo: Partial<Archivo>,
    @param.query.object('where', getWhereSchemaFor(Archivo)) where?: Where<Archivo>,
  ): Promise<Count> {
    return this.tipoRepository.archivos(id).patch(archivo, where);
  }

  @del('/tipos/{id}/archivos', {
    responses: {
      '200': {
        description: 'Tipo.Archivo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Archivo)) where?: Where<Archivo>,
  ): Promise<Count> {
    return this.tipoRepository.archivos(id).delete(where);
  }
}
