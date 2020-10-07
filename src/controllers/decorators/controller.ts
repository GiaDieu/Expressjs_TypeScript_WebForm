import "reflect-metadata";
import { AppRouter } from "../../AppRouter";
import { Methods } from "./Methods"; // enum
import { MetadataKeys } from "./MetadataKeys"; // enum
import { Request, Response, NextFunction, RequestHandler } from "express";

function bodyValidators(keys: string): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      // if user click the button, to check whether the email and password exists
      res.status(422).send("Invalid Request!");
      return;
    }
    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`Missing Property ${key}`);
        return;
      }
    }
    next();
  };
}
export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();

    for (let key in target.prototype) {
      // key === 'getLogin'
      // key === 'postLogin'

      const routeHandler = target.prototype[key]; // example: 'getLogin' method, 'postLogin' method
      const path = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key
      ); // '/login','/login'

      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      ); // 'get','post'

      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        [];

      const requireBodyProps =
        Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) ||
        [];

      const validator = bodyValidators(requireBodyProps);

      // Look at here how flexible, in theory, the method variable will be 'get','put','post' and so on...
      if (path) {
        // refactoring a small piece of code here
        // router.get(`${routePrefix}${path}`, routeHandler);
        // router.get === router[method] == method == 'get'
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          validator,
          routeHandler
        );
      }
    }
  };
}
