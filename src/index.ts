import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import charactersRoutes from './routes/characters'

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

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
