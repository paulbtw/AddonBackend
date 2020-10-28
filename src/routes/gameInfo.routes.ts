import { Router } from "express";
import {
  getGameBySteamAppid,
  getGameByPath,
  getGameByRawName,
} from "../controller/game.controller";

const router = Router();

router.get("/steam/:steamAppid", getGameBySteamAppid);

router.get("/retailer/:path", getGameByPath);

router.get("/name/:rawName", getGameByRawName);

export default router;
