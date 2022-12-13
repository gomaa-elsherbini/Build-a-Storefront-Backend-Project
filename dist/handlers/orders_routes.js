"use strict";
// import express, { Request, Response } from 'express';
// import { Order, OrderStore } from '../models/order';
// import verifyAuthToken from '../middleware/verifyAuthToken';
// const store = new OrderStore();
// const create = async (req: Request, res: Response) => {
//   const order: Order = {
//     status: req.body.status,
//     user_id: req.body.user_id
//   };
//   try {
//     const newOrder = await store.createOrder(order);
//     res.json(newOrder);
//   } catch (err) {
//     res.status(400);
//     res.json((err as string) + order);
//   }
// };
// const index = async (req: Request, res: Response) => {
//   try {
//      const orders = await store.getCompletedUserOrders(req.params.id as unknown as number);
//   res.json(orders);
//   } catch (error) {
//     res.json(`can not get uncompleted orders${error}`)
//   }
// };
// const show = async (req: Request, res: Response) => {
//   const order = await store.getCurrentUserOrder(req.params.id as unknown as number);
//   res.json(order);
// };
// const addProduct = async (req: Request, res: Response) => {
//   const quantity = req.body.quantity;
//   const product_id = req.body.product_id;
//   const order_id = req.params.id as unknown as number;
//   try {
//     const addedProduct = await store.addProduct(quantity, product_id, order_id);
//     res.json(addedProduct);
//   } catch (err) {
//     res.status(400);
//     res.send(`${err}`);
//   }
// };
// const orderRoutes = (app: express.Application) => {
//   //get completed orders by user (user.id)
//   app.get('/orders/users/:id',verifyAuthToken, index);  
//   // get current order by user (user.id)  
//   app.get('/orders/:id',verifyAuthToken, show);
//   //create an order for a specific user(user.id)
//   app.post('/orders', create);
//   //add product to an existing order
//   app.post('/orders/:id/products', addProduct);
// };
// export default orderRoutes;
