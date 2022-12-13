import app from '../../server';
import supertest from 'supertest';
import { Product } from '../../models/product_model';

const request = supertest(app);
let token = '';

describe('4- Test endpoints to products', () => {
  it('- success login and to get token endpoint', async () => {
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

  it('- success to create a new product endpoint', async () => {
    const res = await request
      .post('/products')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'ipad',
        price: '$500',
      } as Product);
    expect(res.status).toBe(200);
  });

  it('- success to get all products endpoint', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
  });

  it('- success to get one product endpoint', async () => {
    const response = await request.get('/products/2');
    expect(response.status).toBe(200);
  });
});
