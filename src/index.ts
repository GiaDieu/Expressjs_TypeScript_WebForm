import express from "express";
import { router } from "./routes/loginRoutes";
import bodyParser from "body-parser"; // it is a middleware
import cookieSession from "cookie-session";
import { router as controllerRouter } from "./controllers/decorators/controller";
import "./controllers/loginController";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ["default"] }));
app.use(router);
app.use(controllerRouter);

app.listen(3001, () => {
  console.log("listening on port 3001");
});
