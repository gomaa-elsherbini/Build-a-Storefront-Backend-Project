"use strict";
// import express, { Request, Response } from 'express';
// import { User, UserStore } from '../models/user';
// import jwt from 'jsonwebtoken';
// import verifyAuthToken from '../middleware/verifyAuthToken';
// const store = new UserStore();
// const index = async (_req: Request, res: Response) => {
//   const users = await store.getAllUsers();
//   res.json(users);
// };
// const show = async (req: Request, res: Response) => {
//   const user = await store.getOneUser(req.params.id as unknown as number);
//   res.json(user);
// };
// const create = async (req: Request, res: Response) => {
//   const user: User = {
//     username: req.body.username,
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     password: req.body.password
//   };
//   try {
//     const newUser = await store.createUser(user);
//     const token= jwt.sign({user:newUser}, process.env.TOKEN_SECRET as unknown as string)
//     res.json(newUser+token);
//   } catch (err) {
//     res.status(400);  
//     res.json(err as string + user);
//   }
// };
// const authenticate= async (req: Request, res: Response) => {
//   try {
//     const user = await store.authenticate(req.body.username, req.body.password);
//     const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET as unknown as string);
//     res.json(token)
//   } catch (err) {
//     res.status(400);
//     res.json(err);
//   }
// };
// const usersRoutes = (app: express.Application) => {
//   app.get('/users', index);//todo verifyAuthToken,
//   app.get('/users/:id', show);//todo verifyAuthToken,
//   app.post('/users', create);
//   app.post('/users/authenticate', authenticate);
// };
// export default usersRoutes;
