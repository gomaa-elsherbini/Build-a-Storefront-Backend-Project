import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import usersRoutes from './handlers/users_handler';
import orderRoutes from './handlers/orders_handler';
import productRoutes from './handlers/products_handler';
import dashboardRoutes from './handlers/dashboard_handler';

const app: express.Application = express();

const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

usersRoutes(app);
orderRoutes(app);
productRoutes(app);
dashboardRoutes(app);

app.get('/', (_req: Request, res: Response) => {
  console.log('=====<<<Home EndPoint>>>=====');
  res.send('welcome to storeFront backEnd API');
});

app.listen(port, () => {
  console.log(`starting app on http://localhost:${port}}`);
});

export default app;
