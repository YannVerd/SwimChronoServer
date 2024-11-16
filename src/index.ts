import express from "express";
import './models/user.model';
import dotenv from "dotenv";
import cors from "cors";
import { router } from "./routers/router";
import "./models/db";
import helmet from "helmet";
import cookieParser from 'cookie-parser';

dotenv.config({ path: ".env" });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(helmet())
app.use(cookieParser())

const PORT = process.env.PORT || 3001;

app.use(router);

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
});