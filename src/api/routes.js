import express from "express";
import { settleTaxHandler } from "./tax.controller.js";

const router = express.Router();

router.post("/tax/settle", settleTaxHandler);

export default router;
