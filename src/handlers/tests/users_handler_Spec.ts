import app from '../../server';
import supertest from 'supertest';

const request = supertest(app);
let token = '';

describe('5- Test endpoints to users', () => {
  it('- success to get user authentication endpoint', async () => {
    const response = await request
      .post('/users/authenticate')
      .set('Content-type', 'application/json')
      .send({ username: 'username1', password: 'pass1' });
    expect(response.status).toBe(200);
    const { id, username, token: userToken } = response.body.data;
    expect(id).toBe(1);
    expect(username).toBe('username1');
    token = userToken;
  });

  it('- success to create new user endpoint', async () => {
    const res = await request
      .post('/users')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: 'moSalah',
        first_name: 'mo',
        last_name: 'salah',
        password: 'mosalah',
      });
    expect(res.status).toBe(200);
  });
  it('- success to get users endpoint', async () => {
    const res = await request
      .get('/users')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it('- success to get the specific user endpoint', async () => {
    const res = await request
      .get('/users/1')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
});
