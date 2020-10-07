import { Request, Response, NextFunction } from "express";
import { get, controller, bodyValidator, post } from "./decorators";

// function logger(req: Request, res: Response, next: NextFunction) {
//   console.log("Request was made!");
//   next();
// }
//trial for middleware logger
@controller("/auth")
class LoginController {
  //Argument of type 'TypedPropertyDescriptor<(a: number, b: number) => number>' is not assignable to parameter of type 'routeHandlerDescriptor'.
  // @get("/")
  // add(a: number, b: number): number {
  //   return a + b;
  // }

  @get("/login") //(alias) get(path: string): (target: any, key: string, desc: PropertyDescriptor) => void
  // @use(logger)
  getLogin(req: Request, res: Response): void {
    res.send(`
          <form method="POST">
              <div>
                  <label>Email</label>
                  <input name="email" type="email" />
              </div>
              <div>
                  <label>Password</label>
                  <input name="password" type="password" />
              </div>
              <button>Submit</button>
          </form>
        `);
  }
  @post("/login")
  @bodyValidator("email", "password")
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    // Understanding body-parser
    // When users filled on the form and click the button, the information will go into HTTP Request {Headers: ...., and body of HTTP Request {email=email, password=password} and
    // generate these information to Express Server as Request Object {id: number, hostname:string} and other properties.

    // By default, Request Object in Express does not have a body property, instead the Request Object of Express will pass to the middleware body-parser.
    // and then body-parser is going to inspect the incoming HTTP REQUEST whether there is the actual body of HTTP Request or not attached to it and then body-parser is going to parse those information in STRING 'email=email&password=password' and
    // attach it to the Request Object of Express Server:

    //{ id: number,
    //  hostname:string,
    //  body: {email: 'email', password: 'password'}
    //}

    // NOTE:
    // TypeScript does not give us indication, ideally, req.body contains the Object that might or might not have properties.
    // Solution: create interface RequestWithBody.

    //New technique: since you applied the decorator of bodyValidator, you do not need to check whether the email or pass exists
    //so you do not to pass interface //
    //interface RequestWithBody extends Request {
    //   body: { [key: string]: string | undefined };
    // }
    if (
      //email &&
      //password &&
      email === "giadieuly@gmail.com" &&
      password === "password"
    ) {
      //mark this person as logged in
      req.session = { isLoggedIn: true };
      //redirect them to the root route
      res.redirect("/");
    } else {
      res.send("Invalid email or password");
    }
  }

  @get("/logout")
  getLogout(req: Request, res: Response) {
    req.session = null;
    res.redirect("/");
  }
}
