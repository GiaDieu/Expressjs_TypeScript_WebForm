import "reflect-metadata";
import { AppRouter } from "../../AppRouter";
import { Methods } from "./Methods";

export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();

    for (let key in target.prototype) {
      // key === 'getLogin'
      const routeHandler = target.prototype[key]; // example: 'getLogin' method
      const path = Reflect.getMetadata("path", target.prototype, key); // '/login'
      const method: Methods = Reflect.getMetadata(
        "method",
        target.prototype,
        key
      );

      // Look at here how flexible, in theory, the method variable will be 'get','put','post' and so on...
      if (path) {
        // refactoring a small piece of code here
        // router.get(`${routePrefix}${path}`, routeHandler);
        // router.get === router[method] == method == 'get'
        router[method](`${routePrefix}${path}`, routeHandler);
      }
    }
  };
}
