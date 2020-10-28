import { Request, Response, NextFunction } from "express";
import { getRepository, Like } from "typeorm";
import { GameInfo } from "../entities/GameInfo";
import { GameOffers } from "../entities/GameOffers";
import { getHltbData } from "../util/hltb";
import { getSteamChartsData } from "../util/steamCharts";
import { getSteamSpy } from "../util/steamSpy";

const steamChartsUrl = "https://steamcharts.com/app/";

export const getGameBySteamAppid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reqAppid = req.params.steamAppid;
  try {
    const data = await getRepository(GameInfo)
      .createQueryBuilder("gameInfo")
      .where("gameInfo.steamId = :steamId", { steamId: reqAppid })
      .leftJoinAndSelect("gameInfo.gameOffers", "gameOffer")
      .andWhere("gameOffer.price > 0")
      .orderBy("gameOffer.price")
      .leftJoinAndSelect("gameOffer.store", "store")
      .getOne();

    if (!data) {
      throw new Error("Game not found.");
    }

    const externalData = await Promise.all([
      await getSteamSpy(reqAppid),
      await getSteamChartsData(reqAppid),
      await getHltbData(data.nameRaw),
    ]);

    return res.status(200).json({
      success: true,
      game: data,
      spy: externalData[0],
      hltb: externalData[2],
      sc: externalData[1],
    });
  } catch (err) {
    next(err);
  }
};

export const getGameByPath = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const urlPath = req.params.path;

  try {
    const idData = await getRepository(GameOffers).findOne({
      where: { url: Like(`%${urlPath}%`) },
    });

    if (!idData) {
      throw new Error("Game not found.");
    }

    const data = await getRepository(GameInfo)
      .createQueryBuilder("gameInfo")
      .where("gameInfo.id = :gameId", { gameId: idData.gameInfoId })
      .leftJoinAndSelect("gameInfo.gameOffers", "gameOffer")
      .andWhere("gameOffer.price > 0")
      .orderBy("gameOffer.price")
      .leftJoinAndSelect("gameOffer.store", "store")
      .getOne();

    return res.status(200).json({
      success: true,
      game: data,
    });
  } catch (err) {
    next(err);
  }
};

export const getGameByRawName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const rawName = req.params.rawName;

  try {
    const idData = await getRepository(GameOffers).findOne({
      where: { rawName: rawName },
    });

    if (!idData) {
      throw new Error("Game not found.");
    }

    const data = await getRepository(GameInfo)
      .createQueryBuilder("gameInfo")
      .where("gameInfo.id = :gameId", { gameId: idData.gameInfoId })
      .leftJoinAndSelect("gameInfo.gameOffers", "gameOffer")
      .andWhere("gameOffer.price > 0")
      .orderBy("gameOffer.price")
      .leftJoinAndSelect("gameOffer.store", "store")
      .getOne();

    return res.status(200).json({
      success: true,
      game: data,
    });
  } catch (err) {
    next(err);
  }
};
