import "express-async-errors";
import { userRouter } from "./routes/users.route";
import express from "express";
import { errorRouter } from "./routes/error.route";
import errorHandlingMiddleware from "./middlewares/errorHandling.middleware";
import { loginRouter } from "./routes/login.route";
import { contactRouter } from "./routes/contacts.route";
import cors from "cors";

export const app = express();

app.use(cors());

app.use(express.json());

app.use("/users", userRouter);
app.use("/contacts", contactRouter);
app.use("/login", loginRouter);
app.use("/error", errorRouter);
app.use(errorHandlingMiddleware);
