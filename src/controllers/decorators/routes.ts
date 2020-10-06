import "reflect-metadata";
import { Methods } from "./Methods";

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

function routeBinder(method: string) {
  // method: get/put/post/or patch
  return function (path: string) {
    // path = '/login'
    return function (target: any, key: string, desc: PropertyDescriptor) {
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
export const get = routeBinder(Methods.get);
export const put = routeBinder(Methods.put);
export const post = routeBinder(Methods.post);
export const del = routeBinder(Methods.del);
export const patch = routeBinder(Methods.patch);

// pls look at the file controller.ts
