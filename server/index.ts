import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import corsOptions from "./config/corsOptions";
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;
import patternRouter from "./routes/patternRoutes";

app.use(cors(corsOptions));

app.use("/pattern", patternRouter);
app.use(express.static(__dirname + "/patterns"));

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
