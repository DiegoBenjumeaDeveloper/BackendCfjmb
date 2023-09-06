import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Tipo} from '../models';
import {TipoRepository} from './tipo.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly tipos: HasManyRepositoryFactory<Tipo, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.MySql') dataSource: MySqlDataSource, @repository.getter('TipoRepository') protected tipoRepositoryGetter: Getter<TipoRepository>,
  ) {
    super(Usuario, dataSource);
    this.tipos = this.createHasManyRepositoryFactoryFor('tipos', tipoRepositoryGetter,);
    this.registerInclusionResolver('tipos', this.tipos.inclusionResolver);
  }
}
