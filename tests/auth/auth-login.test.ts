import { HttpStatus } from '../../src/api/common/common.interface';
import { getBuild } from '../helper';

describe('Auth login route tests', () => {
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

  test('Should log in user', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/auth/login',
      payload: {
        username: 'test000099',
        password: 'Test@0000099',
      },
    });

    expect(res.statusCode).toEqual(HttpStatus.OK);
    expect(JSON.parse(res.body)).toMatchObject({
      token: expect.anything(),
    });
  });
});
