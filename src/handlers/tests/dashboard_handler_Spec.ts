import app from '../../server';
import supertest from 'supertest';

const request = supertest(app);

describe('1- Test endpoint to show products in orders', () => {
  it('- success to get products in the orders endpoint', async () => {
    const response = await request.get('/products_in_orders');
    expect(response.status).toBe(200);
  });
});

describe('2- Test endpoint to show five most popular_products', () => {
  it('- success to get five most popular_products endpoint', async () => {
    const response = await request.get('/popular_products');
    expect(response.status).toBe(200);
  });
});
