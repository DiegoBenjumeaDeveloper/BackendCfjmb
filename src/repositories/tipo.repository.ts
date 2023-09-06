import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {Tipo, TipoRelations, Archivo} from '../models';
import {ArchivoRepository} from './archivo.repository';

export class TipoRepository extends DefaultCrudRepository<
  Tipo,
  typeof Tipo.prototype.id,
  TipoRelations
> {

  public readonly archivos: HasManyRepositoryFactory<Archivo, typeof Tipo.prototype.id>;

  constructor(
    @inject('datasources.MySql') dataSource: MySqlDataSource, @repository.getter('ArchivoRepository') protected archivoRepositoryGetter: Getter<ArchivoRepository>,
  ) {
    super(Tipo, dataSource);
    this.archivos = this.createHasManyRepositoryFactoryFor('archivos', archivoRepositoryGetter,);
    this.registerInclusionResolver('archivos', this.archivos.inclusionResolver);
  }
}
