import { Router } from "express";
import { getSalesData } from "../controllers/sales";

const router = Router();

router.get("/sales-data", getSalesData);

export default router;