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
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuthToken_1 = __importDefault(require("../middleware/verifyAuthToken"));
const store = new user_1.UserStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield store.getAllUsers();
    res.json(users);
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield store.getOneUser(req.params.id);
    res.json(user);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password
    };
    try {
        const newUser = yield store.createUser(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err + user);
    }
});
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield store.authenticate(req.body.username, req.body.password);
        const token = jsonwebtoken_1.default.sign({ user: user }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const usersRoutes = (app) => {
    app.get('/users', index); //ToDo verifyAuthToken,
    app.get('/users/:id', verifyAuthToken_1.default, show); ////ToDo verifyAuthToken,
    app.post('/users', create); //ToDo verifyAuthToken,
    app.post('/users/authenticate', authenticate);
};
exports.default = usersRoutes;
