import Client from '../database';

export class DashboardQueries {
  async productsInOrders(): Promise<
    { name: string; price: number; order_id: string }[]
  > {
    try {
      const conn = await Client.connect();
      const sql =
        'SELECT name, price, order_id FROM products INNER JOIN order_products ON products.id=order_products.product_id;';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`);
    }
  }

  async fiveMostPopularProducts(): Promise<{ name: string }[]> {
    try {
      const conn = await Client.connect();
      const sql =
        'SELECT name FROM products INNER JOIN order_products ON products.id=order_products.product_id ORDER BY quantity DESC LIMIT 5;';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable get products: ${err}`);
    }
  }
}
