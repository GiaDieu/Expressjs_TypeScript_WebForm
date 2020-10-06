"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
var AppRouter_1 = require("../../AppRouter");
function controller(routePrefix) {
    return function (target) {
        var router = AppRouter_1.AppRouter.getInstance();
        for (var key in target.prototype) {
            // key === 'getLogin'
            var routeHandler = target.prototype[key]; // example: 'getLogin' method
            var path = Reflect.getMetadata("path", target.prototype, key); // '/login'
            var method = Reflect.getMetadata("method", target.prototype, key);
            // Look at here how flexible, in theory, the method variable will be 'get','put','post' and so on...
            if (path) {
                // refactoring a small piece of code here
                // router.get(`${routePrefix}${path}`, routeHandler);
                // router.get === router[method] == method == 'get'
                router[method]("" + routePrefix + path, routeHandler);
            }
        }
    };
}
exports.controller = controller;
