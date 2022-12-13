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
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM products;';
                const result = yield conn.query(sql);
                const products = result.rows;
                conn.release();
                return products;
            }
            catch (err) {
                throw new Error(`Could not get products. Error: ${err}`);
            }
        });
    }
    getOneProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM products WHERE id=($1)';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                const product = result.rows[0];
                conn.release();
                return product;
            }
            catch (err) {
                throw new Error(`Could not find product ${id}. Error: ${err}`);
            }
        });
    }
    createProduct(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING id, name, price';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [p.name, p.price]);
                const new_product = result.rows[0];
                conn.release();
                //   console.log(new_product);
                return new_product;
            }
            catch (err) {
                throw new Error(`can not create an new product ${p.name}: ${err}`);
            }
        });
    }
    updateProduct(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'UPDATE products SET name=$1, price=$2 WHERE id=$3 RETURNING name, price, id;';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [p.name, p.price, p.id]);
                const updatedProduct = result.rows[0];
                //   console.log(updatedProduct);
                conn.release();
                return updatedProduct;
            }
            catch (err) {
                throw new Error(`Could not update user ${p.name}. Error: ${err}`);
            }
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM products WHERE id=($1)';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                const deleted_product = result.rows[0];
                conn.release();
                return deleted_product;
            }
            catch (err) {
                throw new Error(`Could not delete product ${id}. Error: ${err}`);
            }
        });
    }
}
exports.ProductStore = ProductStore;
