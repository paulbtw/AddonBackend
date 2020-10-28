import { Router } from "express";

import gameRoutes from "./gameInfo.routes";
import reportRoutes from "./report.routes";

const router = Router();

router.use("/", gameRoutes);

router.use("/report", reportRoutes);

export default router;
