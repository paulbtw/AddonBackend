import { Request, Response, NextFunction } from "express";

export const postReportGame = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO
  return res.status(200).json({
    success: true,
  });
};
