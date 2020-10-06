"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
var AppRouter_1 = require("../../AppRouter");
var MetadataKeys_1 = require("./MetadataKeys"); // enum
function controller(routePrefix) {
    return function (target) {
        var router = AppRouter_1.AppRouter.getInstance();
        for (var key in target.prototype) {
            // key === 'getLogin'
            var routeHandler = target.prototype[key]; // example: 'getLogin' method
            var path = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.path, target.prototype, key); // '/login'
            var method = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.method, target.prototype, key); // 'get'
            var middlewares = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.middleware, target, key) || [];
            // Look at here how flexible, in theory, the method variable will be 'get','put','post' and so on...
            if (path) {
                // refactoring a small piece of code here
                // router.get(`${routePrefix}${path}`, routeHandler);
                // router.get === router[method] == method == 'get'
                router[method].apply(router, __spreadArrays(["" + routePrefix + path], middlewares, [routeHandler]));
            }
        }
    };
}
exports.controller = controller;
