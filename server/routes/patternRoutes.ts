import express from "express";
const router = express.Router();
import { getMcPatterns } from "../controllers/patternController";

router.route("/mc").get(getMcPatterns);

export default router;
