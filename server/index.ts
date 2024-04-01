import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import corsOptions from "./config/corsOptions";
import cellRoutes from "./routes/cellRoutes";
import mcRoutes from "./routes/mcRoutes";
import patternRoutes from "./routes/patternRoutes";
import rleRoutes from "./routes/rleRoutes";
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(express.json());

// app.use("/pattern", patternRoutes);
// app.use("/mc", mcRoutes);
// app.use("/cell", cellRoutes);
// app.use("/rle", rleRoutes);
app.use("/all", express.static(__dirname + "/patterns"));

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
