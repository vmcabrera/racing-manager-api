import { HttpStatus } from '../../src/api/common/common.interface';
import { getBuild } from '../helper';

describe('Auth register route tests', () => {
  const app = getBuild();

  test('Should register new user', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/auth/register',
      payload: {
        username: 'test000099',
        email: 'test000099@racingmanager.com',
        password: 'Test@0000099',
      },
    });

    expect(res.statusCode).toEqual(HttpStatus.OK);
    expect(JSON.parse(res.body)).toMatchObject({
      id: expect.anything(),
    });
  });

  test('Should return username or email is registered', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/auth/register',
      payload: {
        username: 'test000099',
        email: 'test000099@racingmanager.com',
        password: 'Test@0000099',
      },
    });

    expect(res.statusCode).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(JSON.parse(res.body)).toMatchObject({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Username or email already registered',
    });
  });
});
