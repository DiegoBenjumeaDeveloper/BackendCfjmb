import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {Tipo, TipoRelations} from '../models';

export class TipoRepository extends DefaultCrudRepository<
  Tipo,
  typeof Tipo.prototype.id,
  TipoRelations
> {
  constructor(
    @inject('datasources.MySql') dataSource: MySqlDataSource,
  ) {
    super(Tipo, dataSource);
  }
}
