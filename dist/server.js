"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const users_handler_1 = __importDefault(require("./handlers/users_handler"));
const orders_handler_1 = __importDefault(require("./handlers/orders_handler"));
const products_handler_1 = __importDefault(require("./handlers/products_handler"));
const dashboard_handler_1 = __importDefault(require("./handlers/dashboard_handler"));
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
(0, users_handler_1.default)(app);
(0, orders_handler_1.default)(app);
(0, products_handler_1.default)(app);
(0, dashboard_handler_1.default)(app);
app.get('/', (_req, res) => {
    console.log('=====<<<Home EndPoint>>>=====');
    res.send('welcome to storeFront backEnd API');
});
app.listen(port, () => {
    console.log(`starting app on http://localhost:${port}}`);
});
exports.default = app;
