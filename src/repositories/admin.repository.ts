import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {Admin, AdminRelations} from '../models';

export class AdminRepository extends DefaultCrudRepository<
  Admin,
  typeof Admin.prototype.id,
  AdminRelations
> {
  constructor(
    @inject('datasources.MySql') dataSource: MySqlDataSource,
  ) {
    super(Admin, dataSource);
  }
}
