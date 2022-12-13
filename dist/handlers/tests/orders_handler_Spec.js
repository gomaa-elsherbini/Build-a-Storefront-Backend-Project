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
const user_model_1 = require("../../models/user_model");
const request = (0, supertest_1.default)(server_1.default);
const userModel = new user_model_1.UserStore();
let token = '';
describe('3- Test endpoints to orders', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield userModel.createUser({
            username: 'username1',
            first_name: 'user1',
            last_name: 'name1',
            password: 'pass1',
        });
    }));
    it('- success login and send token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post('/users/authenticate')
            .set('Content-type', 'application/json')
            .send({ username: 'username1', password: 'pass1' });
        const { id, username, token: userToken } = response.body.data;
        expect(response.status).toBe(200);
        expect(id).toBe(1);
        expect(username).toBe('username1');
        token = userToken;
    }));
    it('- success to create a new order', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .post('/orders')
            .set('Content-type', 'application/json')
            .send({
            status: 'complete',
            user_id: 1,
        });
        expect(res.status).toBe(200);
    }));
    it('- success to get completed orders for a specific user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get('/orders/users/1')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    }));
    it('- success to get Current Order by user ', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get('/orders/user_current_order/1')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    }));
    it('- success to add products to an existing order', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/orders/1/products');
        expect(response.status).toBe(200);
    }));
});
