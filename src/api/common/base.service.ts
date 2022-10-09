import { Repository } from './base.repository';

export abstract class Service<T> {
  public readonly repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  abstract create(props: Partial<T>): Promise<T>;

  getById = async (id: number): Promise<T | null> => {
    const constructor = await this.repository.findById(id);

    return constructor;
  };

  getByUuid = async (uuid: string): Promise<T | null> => {
    const constructor = await this.repository.findByUuid(uuid);

    return constructor;
  };

  get = async (filter: Partial<T>): Promise<T[]> => {
    const constructor = await this.repository.find(filter);

    return constructor;
  };

  getOne = async (filter: Partial<T>): Promise<T | null> => {
    const constructor = await this.repository.findOne(filter);

    return constructor;
  };

  getAll = async (): Promise<T[]> => {
    const constructors = this.repository.findAll();

    return constructors;
  };
}
