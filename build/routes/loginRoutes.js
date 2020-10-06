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
    //TypeScript does not give us indication, ideally, req.body contains the Object that might or might not have properties
    //Solution: create interface RequestWithBody
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
