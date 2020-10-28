import { Router } from "express";
import { postReportGame } from "../controller/report.controller";

const router = Router();

// Add multiple report for: [Retailer, Steam, SteamSpy, hltb, SteamCharts, Wrong price and Wrong game]

router.post("/", postReportGame);

export default router;
