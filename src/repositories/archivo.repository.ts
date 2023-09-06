import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {Archivo, ArchivoRelations} from '../models';

export class ArchivoRepository extends DefaultCrudRepository<
  Archivo,
  typeof Archivo.prototype.id,
  ArchivoRelations
> {
  constructor(
    @inject('datasources.MySql') dataSource: MySqlDataSource,
  ) {
    super(Archivo, dataSource);
  }
}
