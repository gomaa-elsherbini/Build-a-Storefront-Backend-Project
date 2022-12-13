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
const product_1 = require("../models/product");
const verifyAuthToken_1 = __importDefault(require("../middleware/verifyAuthToken"));
const store = new product_1.ProductStore();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield store.getAllProducts();
    res.json(orders);
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield store.getOneProduct(req.params.id);
    res.json(order);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    try {
        const newProduct = yield store.createProduct(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err + product);
    }
});
const productRoutes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken_1.default, create);
};
exports.default = productRoutes;
