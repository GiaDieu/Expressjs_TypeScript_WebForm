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
            var routeHandler = target.prototype[key];
            var path = Reflect.getMetadata("path", target.prototype, key);
            if (path) {
                router.get("" + routePrefix + path, routeHandler);
            }
        }
    };
}
exports.controller = controller;
