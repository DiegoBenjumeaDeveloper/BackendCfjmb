import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {Admin, AdminRelations, Rol} from '../models';
import {RolRepository} from './rol.repository';

export class AdminRepository extends DefaultCrudRepository<
  Admin,
  typeof Admin.prototype.id,
  AdminRelations
> {

  public readonly rols: HasManyRepositoryFactory<Rol, typeof Admin.prototype.id>;

  constructor(
    @inject('datasources.MySql') dataSource: MySqlDataSource, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>,
  ) {
    super(Admin, dataSource);
    this.rols = this.createHasManyRepositoryFactoryFor('rols', rolRepositoryGetter,);
    this.registerInclusionResolver('rols', this.rols.inclusionResolver);
  }
}
