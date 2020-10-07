"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("./decorators");
// function logger(req: Request, res: Response, next: NextFunction) {
//   console.log("Request was made!");
//   next();
// }
//trial for middleware logger
var LoginController = /** @class */ (function () {
    function LoginController() {
    }
    //Argument of type 'TypedPropertyDescriptor<(a: number, b: number) => number>' is not assignable to parameter of type 'routeHandlerDescriptor'.
    // @get("/")
    // add(a: number, b: number): number {
    //   return a + b;
    // }
    // @use(logger)
    LoginController.prototype.getLogin = function (req, res) {
        res.send("\n          <form method=\"POST\">\n              <div>\n                  <label>Email</label>\n                  <input name=\"email\" type=\"email\" />\n              </div>\n              <div>\n                  <label>Password</label>\n                  <input name=\"password\" type=\"password\" />\n              </div>\n              <button>Submit</button>\n          </form>\n        ");
    };
    LoginController.prototype.postLogin = function (req, res) {
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
        //New technique: since you applied the decorator of bodyValidator, you do not need to check whether the email or pass exists
        //so you do not to pass interface //
        //interface RequestWithBody extends Request {
        //   body: { [key: string]: string | undefined };
        // }
        if (
        //email &&
        //password &&
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
    };
    LoginController.prototype.getLogout = function (req, res) {
        req.session = null;
        res.redirect("/");
    };
    __decorate([
        decorators_1.get("/login") //(alias) get(path: string): (target: any, key: string, desc: PropertyDescriptor) => void
        ,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "getLogin", null);
    __decorate([
        decorators_1.post("/login"),
        decorators_1.bodyValidator("email", "password"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "postLogin", null);
    __decorate([
        decorators_1.get("/logout"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "getLogout", null);
    LoginController = __decorate([
        decorators_1.controller("/auth")
    ], LoginController);
    return LoginController;
}());
