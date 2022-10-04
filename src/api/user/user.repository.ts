import { Repository } from '../common/base.repository';
import { pg } from '../database/database.connection';
import { User, UserDBModel, UserSaveProps } from './user.interface';

export class UserRepository extends Repository<User> {
  constructor() {
    super(UserDBModel);
  }

  save = async (props: UserSaveProps): Promise<User> => {
    const result: User[] = await pg.query(
      'INSERT INTO users (username, email, password, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [
        props.username,
        props.email,
        props.password,
        props.first_name || null,
        props.last_name || null,
      ]
    );

    return result[0];
  };
}
