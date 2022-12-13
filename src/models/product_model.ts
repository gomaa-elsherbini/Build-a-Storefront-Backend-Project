import Client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: string;
};

export class ProductStore {
  async getAllProducts(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products;';
      const result = await conn.query(sql);
      const products = result.rows;
      conn.release();
      return products;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async getOneProduct(id: string): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }
  async createProduct(p: Product): Promise<Product> {
    try {
      const sql =
        'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING id, name, price';
      const conn = await Client.connect();
      const result = await conn.query(sql, [p.name, p.price]);
      const new_product = result.rows[0];
      conn.release();
      //   console.log(new_product);
      return new_product;
    } catch (err) {
      throw new Error(`can not create an new product ${p.name}: ${err}`);
    }
  }
  async updateProduct(p: Product): Promise<Product> {
    try {
      const sql =
        'UPDATE products SET name=$1, price=$2 WHERE id=$3 RETURNING name, price, id;';
      const conn = await Client.connect();
      const result = await conn.query(sql, [p.name, p.price, p.id]);
      const updatedProduct = result.rows[0];
      //   console.log(updatedProduct);
      conn.release();
      return updatedProduct;
    } catch (err) {
      throw new Error(`Could not update user ${p.name}. Error: ${err}`);
    }
  }
  async deleteProduct(id: string): Promise<Product> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1)';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const deleted_product = result.rows[0];
      conn.release();
      return deleted_product;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
