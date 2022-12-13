"use strict";
// import app from '../../server';
// import supertest from 'supertest';
// import Client from '../../database';
// const request = supertest(app);
// describe('Test users endpoints responses', () => {
//   // beforeAll(async () => {
//   //   const conn = await Client.connect();
//   //   const sql = 'DELETE FROM products;';
//   //   await conn.query(sql);
//   //   conn.release();
//   // });
//   // afterAll(async () => {
//   //   const conn = await Client.connect();
//   //   const sql = 'ALTER SEQUENCE products_id_seq RESTART WITH 1;';
//   //   await conn.query(sql);
//   //   conn.release();
//   // });
//   it('gets the users endpoint', async () => {
//     const response = await request.get('/users');
//     expect(response.status).toBe(200);
//   });
//   it('gets the specific user endpoint', async () => {
//     const response = await request.get('/users/3');
//     expect(response.status).toBe(200);
//   });
//     it('create new user endpoint with un authenticated token', async () => {
//     const response = await request.post('/users');
//     expect(response.status).toBe(200);
//   });
// });
