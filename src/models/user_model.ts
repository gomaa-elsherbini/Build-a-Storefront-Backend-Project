import Client from '../database';
import bcrypt from 'bcrypt';

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;

export type User = {
  id?: number;
  username: string;
  first_name: string;
  last_name: string;
  password?: string;
};

export class UserStore {
  async createUser(u: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO users (username, first_name, last_name, password_digest) VALUES ($1, $2, $3, $4) RETURNING id, username, first_name, last_name;';
      const hash = bcrypt.hashSync(
        `${u.password}${pepper}`,
        parseInt(`${saltRounds}`)
      );
      const result = await conn.query(sql, [
        u.username,
        u.first_name,
        u.last_name,
        hash,
      ]);
      const new_user = result.rows[0];
      conn.release();
      return new_user;
    } catch (err) {
      throw new Error(`can not create an new user ${u.username}: ${err}`);
    }
  }
  async getAllUsers(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT id, username, first_name, last_name FROM users;';
      const result = await conn.query(sql);
      const users = result.rows;
      conn.release();
      return users;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async getOneUser(id: number): Promise<User> {
    try {
      const sql =
        'SELECT id, username, first_name, last_name FROM users WHERE id=($1)';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT  * FROM users WHERE username=$1;';
      const result = await conn.query(sql, [username]);
      if (result.rows.length) {
        const user = result.rows[0];
        if (bcrypt.compareSync(`${password}${pepper}`, user.password_digest)) {
          const userData = await conn.query(
            'SELECT id, username, first_name, last_name FROM users WHERE username=$1;',
            [username]
          );
          return userData.rows[0];
        }
      }
      conn.release();
      return null;
    } catch (error) {
      throw new Error(`unable to login: ${error}`);
    }
  }
}
