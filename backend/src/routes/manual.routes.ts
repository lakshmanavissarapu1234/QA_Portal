import { Router } from "express";
import { generateManualTestCasesController } from "../controllers/manual.controller";

const router = Router();

router.post(
  "/generate",
  generateManualTestCasesController
);

export default router;