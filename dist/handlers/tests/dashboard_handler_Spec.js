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
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(server_1.default);
describe('1- Test endpoint to show products in orders', () => {
    it('- success to get products in the orders endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/products_in_orders');
        expect(response.status).toBe(200);
    }));
});
describe('2- Test endpoint to show five most popular_products', () => {
    it('- success to get five most popular_products endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/popular_products');
        expect(response.status).toBe(200);
    }));
});
