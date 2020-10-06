import "reflect-metadata";
import { AppRouter } from "../../AppRouter";
import { Methods } from "./Methods"; // enum
import { MetadataKeys } from "./MetadataKeys"; // enum
import { use } from "./use";

export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();

    for (let key in target.prototype) {
      // key === 'getLogin'
      const routeHandler = target.prototype[key]; // example: 'getLogin' method
      const path = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key
      ); // '/login'

      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      ); // 'get'

      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target, key) || [];

      // Look at here how flexible, in theory, the method variable will be 'get','put','post' and so on...
      if (path) {
        // refactoring a small piece of code here
        // router.get(`${routePrefix}${path}`, routeHandler);
        // router.get === router[method] == method == 'get'
        router[method](`${routePrefix}${path}`, ...middlewares, routeHandler);
      }
    }
  };
}
