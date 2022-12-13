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
const order_model_1 = require("../order_model");
const store = new order_model_1.OrderStore();
describe('Order Model', () => {
    it('should have a getCompletedUserOrders method', () => {
        expect(store.getCompletedUserOrders).toBeDefined();
    });
    it('should have a getCurrentUserOrder method', () => {
        expect(store.getCurrentUserOrder).toBeDefined();
    });
    it('should have createOrder method', () => {
        expect(store.createOrder).toBeDefined();
    });
    it('create method should create a new order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.createOrder({
            status: 'complete',
            user_id: 1,
        });
        expect(result).toEqual({
            id: 2,
            status: 'complete',
            user_id: 1,
        });
    }));
    it('index method should return a list of all orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.getCompletedUserOrders(1);
        expect(result).toEqual([
            {
                id: 1,
                status: 'complete',
                user_id: 1,
            },
            {
                id: 2,
                status: 'complete',
                user_id: 1,
            },
        ]);
    }));
    it('show method should return the correct order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.getCurrentUserOrder(1);
        expect(result).toEqual({
            id: 1,
            status: 'complete',
            user_id: 1,
        });
    }));
});
