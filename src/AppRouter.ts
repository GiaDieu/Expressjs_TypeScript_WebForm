import express from "express";

export class AppRouter {
  // static <type><variable_name>or<methods> in C#
  // same purpose : create the instance only 1 time when compiling.
  // Static functions can provide functionality related to an a particular class without requiring the programmer to first create an instance of that class.

  private static instance: express.Router;

  static getInstance(): express.Router {
    if (!AppRouter.instance) {
      AppRouter.instance = express.Router();
    }

    return AppRouter.instance;
  }
}
