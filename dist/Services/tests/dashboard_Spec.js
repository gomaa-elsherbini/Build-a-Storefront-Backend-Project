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
const dashboard_1 = require("../../Services/dashboard");
const dashboard = new dashboard_1.DashboardQueries();
describe('dashboard Class', () => {
    it('should have the productsInOrders method', () => {
        expect(dashboard.productsInOrders).toBeDefined();
    });
    it('should have the fiveMostPopularProducts method', () => {
        expect(dashboard.fiveMostPopularProducts).toBeDefined();
    });
    it('productsInOrders method should show the products associated with order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield dashboard.productsInOrders();
        expect(result).toEqual([] //{ name: 'string', price: '$100', order_id: string }
        );
    }));
    it('fiveMostPopularProducts method should show the five most popular products products', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield dashboard.productsInOrders();
        expect(result).toEqual([]);
    }));
});
