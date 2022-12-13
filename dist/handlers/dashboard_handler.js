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
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = require("../Services/dashboard");
const dashboard = new dashboard_1.DashboardQueries();
const productsInOrders = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield dashboard.productsInOrders();
        res.json(products);
    }
    catch (error) {
        res.json(`can not get products${error}`);
    }
});
const fiveMostPopularProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield dashboard.fiveMostPopularProducts();
        res.json(products);
    }
    catch (error) {
        res.json(`can not get five most popular products${error}`);
    }
});
const dashboardRoutes = (app) => {
    //route to order`s products
    app.get('/products_in_orders', productsInOrders);
    //route to popular products
    app.get('/popular_products', fiveMostPopularProducts);
};
exports.default = dashboardRoutes;
