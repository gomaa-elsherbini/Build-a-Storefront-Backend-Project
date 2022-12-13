import express, { Request, Response } from 'express';
import { DashboardQueries } from '../Services/dashboard';

const dashboard = new DashboardQueries();

const productsInOrders = async (_req: Request, res: Response) => {
  try {
    const products = await dashboard.productsInOrders();
    res.json(products);
  } catch (error) {
    res.json(`can not get products${error}`);
  }
};

const fiveMostPopularProducts = async (_req: Request, res: Response) => {
  try {
    const products = await dashboard.fiveMostPopularProducts();
    res.json(products);
  } catch (error) {
    res.json(`can not get five most popular products${error}`);
  }
};

const dashboardRoutes = (app: express.Application) => {
  //route to order`s products
  app.get('/products_in_orders', productsInOrders);

  //route to popular products
  app.get('/popular_products', fiveMostPopularProducts);
};

export default dashboardRoutes;
