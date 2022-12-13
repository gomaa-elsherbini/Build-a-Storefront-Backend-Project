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
const user_model_1 = require("../models/user_model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuthToken_1 = __importDefault(require("../middleware/verifyAuthToken"));
const store = new user_model_1.UserStore();
//create user
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
    };
    try {
        const newUser = yield store.createUser(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json({ data: Object.assign(Object.assign({}, user), { token }) });
    }
    catch (err) {
        res.status(400);
        res.json(err + user);
    }
});
//get all users
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield store.getAllUsers();
    res.json(users);
});
//get one user with its id
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield store.getOneUser(req.params.id);
    res.json(user);
});
//authenticate user with username and password
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield store.authenticate(username, password);
        const token = jsonwebtoken_1.default.sign({ user }, process.env.TOKEN_SECRET);
        if (!user) {
            return res.status(401).json({ status: 'error' });
        }
        res.json({ data: Object.assign(Object.assign({}, user), { token }) });
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const usersRoutes = (app) => {
    app.get('/users', verifyAuthToken_1.default, index);
    app.get('/users/:id', verifyAuthToken_1.default, show);
    app.post('/users', verifyAuthToken_1.default, create);
    app.post('/users/authenticate', authenticate);
};
exports.default = usersRoutes;
