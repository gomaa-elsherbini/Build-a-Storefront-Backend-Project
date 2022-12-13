import Client from '../database';

export type Order = {
  id?: number;
  status: string;
  user_id: number;
};

export class OrderStore {
  async createOrder(o: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *;';
      const conn = await Client.connect();
      const result = await conn.query(sql, [o.status, o.user_id as number]);
      const newOrder = result.rows[0];
      conn.release();
      return newOrder;
    } catch (err) {
      throw new Error(`can not create a new order ${o.user_id}: ${err}`);
    }
  }
  //get Completed Orders by user a specific user
  async getCompletedUserOrders(id: number): Promise<Order[]> {
    // get order to see if it is completed
    try {
      const sql = 'SELECT * FROM orders WHERE user_id=($1)';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const orders = result.rows;
      orders.forEach((order) => {
        if (order.status !== 'complete') {
          throw new Error(
            `Could not get order id: ${order.id} to user id: ${id} because order status is ${order.status}`
          );
        }
      });
      conn.release();
    } catch (err) {
      throw new Error(`${err}`);
    }
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders  WHERE user_id=($1);';
      const result = await conn.query(sql, [id]);
      const orders = result.rows;
      conn.release();
      return orders;
    } catch (err) {
      throw new Error(`Could not get completed orders. Error: ${err}`);
    }
  }

  async getCurrentUserOrder(id: number): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE user_id=($1);';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async deleteOrder(id: number): Promise<Order> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1)';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const deletedOrder = result.rows[0];
      conn.release();
      return deletedOrder;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }

  async addProduct(
    quantity: number,
    product_id: number,
    order_id: number
  ): Promise<Order> {
    try {
      const sql =
        'INSERT INTO order_products (quantity, product_id ,order_id ) VALUES ($1, $2, $3) RETURNING *;';
      const conn = await Client.connect();
      const result = await conn.query(sql, [quantity, product_id, order_id]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(
        `could not add product ${product_id} to order ${order_id}: ${err}`
      );
    }
  }
}
