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
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    createOrder(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *;';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [o.status, o.user_id]);
                const newOrder = result.rows[0];
                conn.release();
                return newOrder;
            }
            catch (err) {
                throw new Error(`can not create a new order ${o.user_id}: ${err}`);
            }
        });
    }
    //get Completed Orders by user a specific user
    getCompletedUserOrders(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // get order to see if it is completed
            try {
                const sql = 'SELECT * FROM orders WHERE user_id=($1)';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                const orders = result.rows;
                orders.forEach((order) => {
                    if (order.status !== 'complete') {
                        throw new Error(`Could not get order id: ${order.id} to user id: ${id} because order status is ${order.status}`);
                    }
                });
                conn.release();
            }
            catch (err) {
                throw new Error(`${err}`);
            }
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders  WHERE user_id=($1);';
                const result = yield conn.query(sql, [id]);
                const orders = result.rows;
                conn.release();
                return orders;
            }
            catch (err) {
                throw new Error(`Could not get completed orders. Error: ${err}`);
            }
        });
    }
    getCurrentUserOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM orders WHERE user_id=($1);';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                const order = result.rows[0];
                conn.release();
                return order;
            }
            catch (err) {
                throw new Error(`Could not find order ${id}. Error: ${err}`);
            }
        });
    }
    deleteOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM orders WHERE id=($1)';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                const deletedOrder = result.rows[0];
                conn.release();
                return deletedOrder;
            }
            catch (err) {
                throw new Error(`Could not delete order ${id}. Error: ${err}`);
            }
        });
    }
    addProduct(quantity, product_id, order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO order_products (quantity, product_id ,order_id ) VALUES ($1, $2, $3) RETURNING *;';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [quantity, product_id, order_id]);
                const order = result.rows[0];
                conn.release();
                return order;
            }
            catch (err) {
                throw new Error(`could not add product ${product_id} to order ${order_id}: ${err}`);
            }
        });
    }
}
exports.OrderStore = OrderStore;
