"use strict";
// import app from '../../server';
// import supertest, { CallbackHandler } from 'supertest';
// import { Order, OrderStore } from '../../models/order'
// const request = supertest(app);
// const store = new OrderStore();
// describe('Test orders endpoints responses', () => {
//   it('test endpoint to create new order', async() => {
//     const order:Order= {status:'complete', user_id:1}
//     const response =  await request.post('/orders').send(order);
//       expect(response.status).toBe(200);
//   });
//   it('test endpoint for completed orders for a specific user', async () => {
//     const response = await request.get('/orders/users/:id');
//     expect(response.status).toBe(200);
//   });
//   it('test endpoint to get order for a specific user ', async () => {
//     const response = await request.get('/orders/20');
//     expect(response.status).toBe(200);
//   });
//   it('adding products to an existing order endpoint with un authenticated token', async () => {
//     const response = await request.post('/orders/1/products');
//     expect(response.status).toBe(200);
//   });
// });
