"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
function requireAuth(req, res, next) {
    if (req.session && req.session.isLoggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send("Not Permitted");
}
var router = express_1.Router();
exports.router = router;
router.post("/login", function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    // Understanding body-parser
    // When users filled on the form and click the button, the information will go into HTTP Request {Headers: ...., and body of HTTP Request {email=email, password=password} and
    // generate these information to Express Server as Request Object {id: number, hostname:string} and other properties.
    // By default, Request Object in Express does not have a body property, instead the Request Object of Express will pass to the middleware body-parser.
    // and then body-parser is going to inspect the incoming HTTP REQUEST whether there is the actual body of HTTP Request or not attached to it and then body-parser is going to parse those information in STRING 'email=email&password=password' and
    // attach it to the Request Object of Express Server:
    //{ id: number,
    //  hostname:string,
    //  body: {email: 'email', password: 'password'}
    //}
    // NOTE:
    // TypeScript does not give us indication, ideally, req.body contains the Object that might or might not have properties.
    // Solution: create interface RequestWithBody.
    if (email &&
        password &&
        email === "giadieuly@gmail.com" &&
        password === "password") {
        //mark this person as logged in
        req.session = { isLoggedIn: true };
        //redirect them to the root route
        res.redirect("/");
    }
    else {
        res.send("Invalid email or password");
    }
});
router.get("/", function (req, res) {
    if (req.session && req.session.isLoggedIn) {
        res.send("\n            <div>\n                <div>You are logged in</div>\n                <a href=\"/logout\">Logout</a>\n            </div>\n        ");
    }
    else {
        res.send("\n        <div>\n            <div>You are not logged in</div>\n            <a href=\"/login\">Login</a>\n        </div>\n    ");
    }
});
router.get("/logout", function (req, res) {
    req.session = null;
    res.redirect("/");
});
router.get("/protected", requireAuth, function (req, res) {
    res.send("Welcome to protected route, logged in user");
});
