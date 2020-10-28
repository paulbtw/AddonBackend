import { ConnectionOptions } from "typeorm";

const startDir = process.env.NODE_ENV === "production" ? "dist" : "src";

export const config: ConnectionOptions = {
  type: "postgres",
  url: process.env.DB_URL,
  synchronize: false,
  entities: [
    `${startDir}/entities/GameInfo{.ts,.js}`,
    `${startDir}/entities/GameOffers{.ts,.js}`,
    `${startDir}/entities/Store{.ts,.js}`,
  ],
};
