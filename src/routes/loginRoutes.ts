import { Router, Request, Response, NextFunction } from "express";

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.isLoggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send("Not Permitted");
}
const router = Router();

router.post("/login", (req: RequestWithBody, res: Response) => {
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
  if (
    email &&
    password &&
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
});

router.get("/", (req: Request, res: Response) => {
  if (req.session && req.session.isLoggedIn) {
    res.send(`
            <div>
                <div>You are logged in</div>
                <a href="/logout">Logout</a>
            </div>
        `);
  } else {
    res.send(`
        <div>
            <div>You are not logged in</div>
            <a href="/login">Login</a>
        </div>
    `);
  }
});

router.get("/logout", (req: Request, res: Response) => {
  req.session = null;
  res.redirect("/");
});

router.get("/protected", requireAuth, (req: Request, res: Response) => {
  res.send("Welcome to protected route, logged in user");
});
export { router };
