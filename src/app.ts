import express, { Express, NextFunction, Request, Response } from 'express';
import charactersRoutes from './routes/characters';
import noblePhantasmsRoutes from './routes/noble-phantasms'

const app: Express = express();

// middleware
app.use(express.json());

// print out path
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log(req.path, req.body);
  next();
});

app.use("/api/characters", charactersRoutes);
app.use("/api/noble-phantasms", noblePhantasmsRoutes);

export default app;
