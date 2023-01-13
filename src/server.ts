import app from "./app";
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 4000;

const server = app.listen(app.get("port"), () => {
  console.log("Listening on port", port);
});

export default server;
