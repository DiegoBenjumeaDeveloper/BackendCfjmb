import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Archivo} from '../models';
import {ArchivoRepository} from '../repositories';

export class ArchivoController {
  constructor(
    @repository(ArchivoRepository)
    public archivoRepository : ArchivoRepository,
  ) {}

  @post('/archivos')
  @response(200, {
    description: 'Archivo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Archivo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Archivo, {
            title: 'NewArchivo',
            exclude: ['id'],
          }),
        },
      },
    })
    archivo: Omit<Archivo, 'id'>,
  ): Promise<Archivo> {
    return this.archivoRepository.create(archivo);
  }

  @get('/archivos/count')
  @response(200, {
    description: 'Archivo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Archivo) where?: Where<Archivo>,
  ): Promise<Count> {
    return this.archivoRepository.count(where);
  }

  @get('/archivos')
  @response(200, {
    description: 'Array of Archivo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Archivo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Archivo) filter?: Filter<Archivo>,
  ): Promise<Archivo[]> {
    return this.archivoRepository.find(filter);
  }

  @patch('/archivos')
  @response(200, {
    description: 'Archivo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Archivo, {partial: true}),
        },
      },
    })
    archivo: Archivo,
    @param.where(Archivo) where?: Where<Archivo>,
  ): Promise<Count> {
    return this.archivoRepository.updateAll(archivo, where);
  }

  @get('/archivos/{id}')
  @response(200, {
    description: 'Archivo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Archivo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Archivo, {exclude: 'where'}) filter?: FilterExcludingWhere<Archivo>
  ): Promise<Archivo> {
    return this.archivoRepository.findById(id, filter);
  }

  @patch('/archivos/{id}')
  @response(204, {
    description: 'Archivo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Archivo, {partial: true}),
        },
      },
    })
    archivo: Archivo,
  ): Promise<void> {
    await this.archivoRepository.updateById(id, archivo);
  }

  @put('/archivos/{id}')
  @response(204, {
    description: 'Archivo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() archivo: Archivo,
  ): Promise<void> {
    await this.archivoRepository.replaceById(id, archivo);
  }

  @del('/archivos/{id}')
  @response(204, {
    description: 'Archivo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.archivoRepository.deleteById(id);
  }
}
