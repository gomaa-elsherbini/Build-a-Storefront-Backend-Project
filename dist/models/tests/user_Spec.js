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
const user_model_1 = require("../user_model");
const store = new user_model_1.UserStore();
describe('User Model', () => {
    it('should have a create method', () => {
        expect(store.createUser).toBeDefined();
    });
    it('should have an index method', () => {
        expect(store.getAllUsers).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.getOneUser).toBeDefined();
    });
    it('should have a authenticate method', () => {
        expect(store.getOneUser).toBeDefined();
    });
    it('create method should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield store.createUser({
            username: 'koko',
            first_name: 'ko',
            last_name: 'ko',
            password: 'koko',
        });
        expect(createdUser).toEqual({
            id: 3,
            username: 'koko',
            first_name: 'ko',
            last_name: 'ko',
        });
    }));
    it('index method should return a list of all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.getAllUsers();
        expect(result).toEqual([
            {
                id: 1,
                username: 'username1',
                first_name: 'user1',
                last_name: 'name1',
            },
            {
                id: 2,
                username: 'moSalah',
                first_name: 'mo',
                last_name: 'salah',
            },
            {
                id: 3,
                username: 'koko',
                first_name: 'ko',
                last_name: 'ko',
            },
        ]);
    }));
    it('show method should return the correct user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.getOneUser(1);
        expect(result).toEqual({
            id: 1,
            username: 'username1',
            first_name: 'user1',
            last_name: 'name1',
        });
    }));
    it('authentication method should return a user in case of valid username and password', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = (yield store.authenticate('username1', 'pass1'));
        expect(result.id).toBe(1);
        expect(result.username).toBe('username1');
        expect(result.first_name).toBe('user1');
        expect(result.last_name).toBe('name1');
    }));
});
