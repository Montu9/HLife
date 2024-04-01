import express from "express";
const router = express.Router();

router.route("/").get();

router.route("/:pattern_name").get();

export default router;
