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
const product_model_1 = require("../product_model");
const store = new product_model_1.ProductStore();
describe('Product Model', () => {
    it('should have a create method', () => {
        expect(store.createProduct).toBeDefined();
    });
    it('should have an index method', () => {
        expect(store.getAllProducts).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.getOneProduct).toBeDefined();
    });
    it('create method should create a new product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.createProduct({
            name: 'product',
            price: '$100',
        });
        expect(result).toEqual({
            id: 2,
            name: 'product',
            price: '$100',
        });
    }));
    it('index method should return a list of all products', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.getAllProducts();
        expect(result).toEqual([
            {
                id: 1,
                name: 'ipad',
                price: '$500',
            },
            {
                id: 2,
                name: 'product',
                price: '$100',
            },
        ]);
    }));
    it('show method should return the correct product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.getOneProduct('1');
        expect(result).toEqual({
            id: 1,
            name: 'ipad',
            price: '$500',
        });
    }));
});
