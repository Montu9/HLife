import express from "express";
import { getMCPattern } from "../controllers/mcController";
const router = express.Router();

router.route("/").get();

router.route("/:pattern_name").get(getMCPattern);

export default router;
