import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user_model';
import jwt from 'jsonwebtoken';
import verifyAuthToken from '../middleware/verifyAuthToken';

const store = new UserStore();

//create user
const create = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
  };
  try {
    const newUser = await store.createUser(user);
    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as string
    );
    res.json({ data: { ...user, token } });
  } catch (err) {
    res.status(400);
    res.json((err as string) + user);
  }
};

//get all users
const index = async (_req: Request, res: Response) => {
  const users = await store.getAllUsers();
  res.json(users);
};

//get one user with its id
const show = async (req: Request, res: Response) => {
  const user = await store.getOneUser(req.params.id as unknown as number);
  res.json(user);
};

//authenticate user with username and password
const authenticate = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await store.authenticate(username, password);
    const token = jwt.sign({ user }, process.env.TOKEN_SECRET as string);
    if (!user) {
      return res.status(401).json({ status: 'error' });
    }
    res.json({ data: { ...user, token } });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const usersRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users', verifyAuthToken, create);
  app.post('/users/authenticate', authenticate);
};

export default usersRoutes;
