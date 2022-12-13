"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
class UserStore {
    createUser(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO users (username, first_name, last_name, password_digest) VALUES ($1, $2, $3, $4) RETURNING id, username, first_name, last_name;';
                const hash = bcrypt_1.default.hashSync(`${u.password}${pepper}`, parseInt(`${saltRounds}`));
                const result = yield conn.query(sql, [
                    u.username,
                    u.first_name,
                    u.last_name,
                    hash,
                ]);
                const new_user = result.rows[0];
                conn.release();
                return new_user;
            }
            catch (err) {
                throw new Error(`can not create an new user ${u.username}: ${err}`);
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT id, username, first_name, last_name FROM users;';
                const result = yield conn.query(sql);
                const users = result.rows;
                conn.release();
                return users;
            }
            catch (err) {
                throw new Error(`Could not get users. Error: ${err}`);
            }
        });
    }
    getOneUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT id, username, first_name, last_name FROM users WHERE id=($1)';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                const user = result.rows[0];
                conn.release();
                return user;
            }
            catch (err) {
                throw new Error(`Could not find user ${id}. Error: ${err}`);
            }
        });
    }
    authenticate(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT  * FROM users WHERE username=$1;';
                const result = yield conn.query(sql, [username]);
                if (result.rows.length) {
                    const user = result.rows[0];
                    if (bcrypt_1.default.compareSync(`${password}${pepper}`, user.password_digest)) {
                        const userData = yield conn.query('SELECT id, username, first_name, last_name FROM users WHERE username=$1;', [username]);
                        return userData.rows[0];
                    }
                }
                conn.release();
                return null;
            }
            catch (error) {
                throw new Error(`unable to login: ${error}`);
            }
        });
    }
}
exports.UserStore = UserStore;
