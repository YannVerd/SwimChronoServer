import express from "express";
import './models/user.model';
import dotenv from "dotenv";
import cors from "cors";
import { router } from "./routers/router";
import "./models/db";
import helmet from "helmet";


dotenv.config({ path: ".env" });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet())

const PORT = process.env.PORT || 3001;

app.use(router);

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
});