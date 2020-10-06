"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var loginRoutes_1 = require("./routes/loginRoutes");
var body_parser_1 = __importDefault(require("body-parser")); // it is a middleware
var cookie_session_1 = __importDefault(require("cookie-session"));
var controller_1 = require("./controllers/decorators/controller");
require("./controllers/loginController");
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cookie_session_1.default({ keys: ["default"] }));
app.use(loginRoutes_1.router);
app.use(controller_1.router);
app.listen(3001, function () {
    console.log("listening on port 3001");
});
