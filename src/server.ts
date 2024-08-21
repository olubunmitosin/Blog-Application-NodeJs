import express, { Express, Request, Response, NextFunction } from "express";
import { ErrorMiddleware } from "./handlers/errorHandlers";
import { responseStructure } from "./utilities/utilityService";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

// Boot environment variables
dotenv.config();

const app: Express = express();
let corsOptions: object = {
  origin: '*'
};

// Use session
app.use(session({secret: 'grant', saveUninitialized: true, resave: false}));
// Use Cors
app.use(cors<Request>(corsOptions));
// Use Cookie parser
app.use(cookieParser());
// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// Serving static files
app.use(express.static('public'));

// set port, listen for requests
const PORT = process.env.PORT || 8080;

// simple route
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to Barnkforte Blog Application Backend!" });
});

// Catch 404 handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send(responseStructure("Resource Not Found", false, []));
});

// Other errors and handle
app.use((ErrorMiddleware.handleError));

// Log port app is listening on
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
