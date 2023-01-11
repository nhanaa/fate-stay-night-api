import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import charactersRoutes from './routes/characters';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

// options for swagger OpenAPI documentation
const options = {
  failOnError: true,
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fate/Stay Night API with Swagger",
      version: "1.0.0",
      description: "This is a simple REST API to get information from the series Fate/Stay Night",
    },
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true})
);

// middleware
app.use(express.json());

// print out path
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log(req.path, req.body);
  next();
});

app.use("/api/characters", charactersRoutes);

app.listen(port, () => {
  console.log("Listening on port", port);
})
