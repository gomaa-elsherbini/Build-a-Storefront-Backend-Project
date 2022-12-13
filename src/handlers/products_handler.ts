import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product_model';
import verifyAuthToken from '../middleware/verifyAuthToken';

const store = new ProductStore();

const create = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
  };
  try {
    const newProduct = await store.createProduct(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json((err as string) + product);
  }
};

const index = async (req: Request, res: Response) => {
  const orders = await store.getAllProducts();
  res.json(orders);
};

const show = async (req: Request, res: Response) => {
  const order = await store.getOneProduct(req.params.id as unknown as string);
  res.json(order);
};

const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyAuthToken, create);
};

export default productRoutes;
