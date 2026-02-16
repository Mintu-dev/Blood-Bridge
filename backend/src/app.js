import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded());


export {app}