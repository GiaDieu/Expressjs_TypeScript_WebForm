"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patch = exports.del = exports.post = exports.put = exports.get = void 0;
require("reflect-metadata");
var Methods_1 = require("./Methods"); // enum
var MetadataKeys_1 = require("./MetadataKeys"); // enum
function routeBinder(method) {
    // method: get/put/post/or patch
    return function (path) {
        // path = '/login'
        return function (target, key, desc) {
            //PropertyDescriptor : can be an Object that having writable, configurable,enumrable and VALUE properties
            //Value Property reference to actual some functions
            //interface tells us that if there is any value, you have to satisfy the Request Handler from Express
            //look at examples in loginController.ts
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.path, path, target, key); // key === 'getLogin'
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.method, method, target, key);
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
