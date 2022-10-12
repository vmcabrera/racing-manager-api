import { IResultExt } from 'pg-promise';
import { IResult } from 'pg-promise/typescript/pg-subset';
import { pg } from '../database/database.connection';
import {
  buildFormattedSet,
  buildFormattedWhere,
} from '../database/database.helper';
import { DBModel } from '../database/database.interface';

export abstract class Repository<T> {
  private readonly model: DBModel;

  constructor(model: DBModel) {
    this.model = model;
  }

  abstract save(data: Partial<T>): Promise<T>;

  async findById(id: number): Promise<T | null> {
    const result: T[] = await pg.query(
      'SELECT * FROM $1:name WHERE $2:name = $3 LIMIT 1',
      [this.model.table, this.model.id, id]
    );

    return result.length > 0 ? result[0] : null;
  }

  async findByUuid(uuid: string): Promise<T | null> {
    const result: T[] = await pg.query(
      'SELECT * FROM $1:name WHERE $2:name = $3 LIMIT 1',
      [this.model.table, this.model.uuid, uuid]
    );

    return result.length > 0 ? result[0] : null;
  }

  async find(filter: Partial<T>): Promise<T[]> {
    const result: T[] = await pg.query('SELECT * FROM $1:name WHERE $2', [
      this.model.table,
      buildFormattedWhere(' AND ', filter),
    ]);

    return result;
  }

  async findOne(filter: Partial<T>): Promise<T | null> {
    const result: T[] = await pg.query(
      'SELECT * FROM $1:name WHERE $2 LIMIT 1',
      [this.model.table, buildFormattedWhere(' AND ', filter)]
    );

    return result.length > 0 ? result[0] : null;
  }

  async findAll(): Promise<T[]> {
    const result: T[] = await pg.query('SELECT * FROM $1:name', [
      this.model.table,
    ]);

    return result;
  }

  async findAllPaginated(limit: number, offset: number): Promise<T[]> {
    const result: T[] = await pg.query(
      'SELECT * FROM $1:name LIMIT $2 OFFSET $3',
      [this.model.table, limit, offset]
    );

    return result;
  }

  async updateByUuid(uuid: string, props: Partial<T>): Promise<T | null> {
    const result: T[] = await pg.query(
      'UPDATE $1:name SET $2 WHERE $3:name = $4 RETURNING *',
      [this.model.table, buildFormattedSet(props), this.model.uuid, uuid]
    );

    return result.length > 0 ? result[0] : null;
  }

  async removeByUuid(uuid: string): Promise<IResultExt> {
    const result = await pg.result('DELETE FROM $1:name WHERE $2:name = $3', [
      this.model.table,
      this.model.uuid,
      uuid,
    ]);

    return result;
  }
}
