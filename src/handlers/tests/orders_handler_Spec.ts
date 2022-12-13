import app from '../../server';
import supertest from 'supertest';
import { Order } from '../../models/order_model';
import { User, UserStore } from '../../models/user_model';

const request = supertest(app);
const userModel = new UserStore();
let token = '';

describe('3- Test endpoints to orders', () => {
  beforeAll(async () => {
    await userModel.createUser({
      username: 'username1',
      first_name: 'user1',
      last_name: 'name1',
      password: 'pass1',
    } as User);
  });

  it('- success login and send token', async () => {
    const response = await request
      .post('/users/authenticate')
      .set('Content-type', 'application/json')
      .send({ username: 'username1', password: 'pass1' });

    const { id, username, token: userToken } = response.body.data;
    expect(response.status).toBe(200);
    expect(id).toBe(1);
    expect(username).toBe('username1');
    token = userToken;
  });

  it('- success to create a new order', async () => {
    const res = await request
      .post('/orders')
      .set('Content-type', 'application/json')
      .send({
        status: 'complete',
        user_id: 1,
      } as Order);
    expect(res.status).toBe(200);
  });

  it('- success to get completed orders for a specific user', async () => {
    const response = await request
      .get('/orders/users/1')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('- success to get Current Order by user ', async () => {
    const response = await request
      .get('/orders/user_current_order/1')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('- success to add products to an existing order', async () => {
    const response = await request.post('/orders/1/products');
    expect(response.status).toBe(200);
  });
});
