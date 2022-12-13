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
const order_model_1 = require("../models/order_model");
const verifyAuthToken_1 = __importDefault(require("../middleware/verifyAuthToken"));
const store = new order_model_1.OrderStore();
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = {
        status: req.body.status,
        user_id: req.body.user_id,
    };
    try {
        const newOrder = yield store.createOrder(order);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err + order);
    }
});
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield store.getCompletedUserOrders(req.params.id);
        res.json(orders);
    }
    catch (error) {
        res.json(`can not get uncompleted orders${error}`);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield store.getCurrentUserOrder(req.params.id);
    res.json(order);
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const quantity = req.body.quantity;
    const product_id = req.body.product_id;
    const order_id = req.params.id;
    try {
        const addedProduct = yield store.addProduct(quantity, product_id, order_id);
        res.json(addedProduct);
    }
    catch (err) {
        res.status(400);
        res.send(`${err}`);
    }
});
const orderRoutes = (app) => {
    //get completed orders by user (user.id)
    app.get('/orders/users/:id', verifyAuthToken_1.default, index);
    // get current order by user (user.id)
    app.get('/orders/user_current_order/:id', verifyAuthToken_1.default, show);
    //create an order for a specific user(user.id)
    app.post('/orders', create);
    //add product to an existing order
    app.post('/orders/:id/products', addProduct);
};
exports.default = orderRoutes;
