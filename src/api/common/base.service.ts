import { Repository } from './base.repository';

export abstract class Service<T> {
  public readonly repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  abstract create(props: Partial<T>): Promise<T>;

  getById = async (id: number): Promise<T | null> => {
    const data = await this.repository.findById(id);

    return data;
  };

  getByUuid = async (uuid: string): Promise<T | null> => {
    const data = await this.repository.findByUuid(uuid);

    return data;
  };

  get = async (filter: Partial<T>): Promise<T[]> => {
    const data = await this.repository.find(filter);

    return data;
  };

  getOne = async (filter: Partial<T>): Promise<T | null> => {
    const data = await this.repository.findOne(filter);

    return data;
  };

  getAll = async (): Promise<T[]> => {
    const data = this.repository.findAll();

    return data;
  };
}
