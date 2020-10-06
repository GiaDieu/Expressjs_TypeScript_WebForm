"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patch = exports.del = exports.post = exports.put = exports.get = void 0;
require("reflect-metadata");
var Methods_1 = require("./Methods");
// We Repeat DRY principles
// https://github.com/kaoengine/kao-pragmatic-progamming#5-your-knowledge-portfolio
// please check our github repo, our Team has summarized some contents of this book Programatic Programmer
// export function get(path: string) {
//   return function (target: any, key: string, desc: PropertyDescriptor) {
//     Reflect.defineMetadata("path", path, target, key);
//     Reflect.defineMetadata("methods", "get", target, key);
//   };
// }
// export function post(path: string) {
//   return function (target: any, key: string, desc: PropertyDescriptor) {
//     Reflect.defineMetadata("path", path, target, key);
//     Reflect.defineMetadata("methods", "post", target, key);
//   };
// }
//We are refactoring the code ? NOPE! we are refactoring the design and the content and the code!
//Specifically, we create factory decorator
//https://www.typescriptlang.org/docs/handbook/decorators.html
function routeBinder(method) {
    // method: get/put/post/or patch
    return function (path) {
        // path = '/login'
        return function (target, key, desc) {
            Reflect.defineMetadata("path", path, target, key); // key === 'getLogin'
            Reflect.defineMetadata("method", method, target, key);
            // this indicate the method that we want this router handler to assign into router
        };
    };
}
// Practical Example: the idea for this refactoring is trying to pull out multiple instances we created with multiple args
// export const get = routeBinder("get");
// export const put = routeBinder("put");
// export const post = routeBinder("post");
// export const del = routeBinder("delete");
// export const patch = routeBinder("patch");
//However, doing these above, we easily to get a typo, instead, pls using enum;
exports.get = routeBinder(Methods_1.Methods.get);
exports.put = routeBinder(Methods_1.Methods.put);
exports.post = routeBinder(Methods_1.Methods.post);
exports.del = routeBinder(Methods_1.Methods.del);
exports.patch = routeBinder(Methods_1.Methods.patch);
// pls look at the file controller.ts
