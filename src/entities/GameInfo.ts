import { Entity, Column, OneToMany, ManyToOne, Index } from "typeorm";
import { Base } from "./Base";
import { GameOffers } from "./GameOffers";

@Entity()
export class GameInfo extends Base {
  @Column("varchar", { length: 512, unique: true, nullable: false })
  @Index({ unique: true })
  public slug!: string;

  @Column("varchar", { array: true, nullable: false })
  public drm!: string[];

  @Column("varchar", { nullable: false })
  public type!: string;

  @Column("varchar", { nullable: false, unique: true })
  @Index({ unique: true })
  public nameFiltered!: string;

  @Column("varchar", { nullable: false, unique: true })
  @Index({ unique: true,  })
  public nameRaw!: string;

  @Column("varchar", { nullable: true })
  public edition!: string;

  @Column("date", { default: "1970/1/1" })
  public releaseDate!: Date;

  @Column("boolean", { default: false, nullable: false })
  public coming_soon!: boolean;

  @Column("text", { nullable: true })
  public detailed_description!: string;

  @Column("text", { nullable: true })
  public about_the_game!: string;

  @Column("text", { nullable: true })
  public short_description!: string;

  @Column("text", { nullable: true })
  public supported_languages!: string;

  @Column("integer", { nullable: true })
  public required_age!: number;

  @Column("text", { nullable: false })
  public imageUrl!: string;

  @Column("integer", { array: true, nullable: true })
  public dlc!: number[];

  @Column("integer", { array: true, nullable: true })
  public packages!: number[];

  @Column("varchar", { array: true, nullable: true })
  public genre!: string[];

  @Column("varchar", { array: true, nullable: true })
  public tags!: string[];

  @Column("varchar", { array: true, nullable: true })
  public developer!: string[];

  @Column("varchar", { array: true, nullable: true })
  public publisher!: string[];

  @Column("jsonb", { array: true, nullable: true })
  public screenshots!: {
    id: number;
    path_thumbnail: string;
    path_full: string;
  }[];

  @Column("jsonb", { array: true, nullable: true })
  public movies!: {
    id: number;
    name: string;
    thumbnail: string;
    webm: {
      480: string;
      max: string;
    };
    mp4: {
      480: string;
      max: string;
    };
    highlight: boolean;
  }[];

  @Column("text", { nullable: true })
  public website!: string;

  @Column("jsonb", { default: {}, nullable: false })
  public pcReq!: {
    minimum?: string;
    recommended?: string;
  };

  @Column("jsonb", { default: {}, nullable: false })
  public macReq!: {
    minimum?: string;
    recommended?: string;
  };

  @Column("jsonb", { default: {}, nullable: false })
  public linuxReq!: {
    minimum?: string;
    recommended?: string;
  };

  @Column("jsonb", {
    default: {
      windows: false,
      mac: false,
      linux: false,
    },
    nullable: false,
  })
  public platforms!: {
    windows: boolean;
    mac: boolean;
    linux: boolean;
  };

  @Column("text", { nullable: true })
  public metaUrl!: string;

  @Column("smallint", { nullable: true })
  public metaScore!: number;

  @Column("int", { unique: true, nullable: true })
  @Index({ unique: true })
  public steamId!: number;

  @Column("varchar", { length: 40, unique: true, nullable: true })
  @Index({ unique: true })
  public originId!: string;

  @Column("varchar", { length: 512, unique: true, nullable: true })
  @Index({ unique: true })
  public uplayId!: string;

  @Column("varchar", { length: 25, unique: true, nullable: true })
  @Index({ unique: true })
  public gogId!: string;

  @Column("varchar", { length: 25, unique: true, nullable: true })
  @Index({ unique: true })
  public epicId!: string;

  @Column("text")
  public url!: string;

  @Column("text", { nullable: true })
  public drmNotice!: string | null;

  @Column("text", { nullable: true })
  public legalNotice!: string | null;

  @Column("text", { nullable: true })
  public background!: string | null;

  @Column("boolean", { default: false })
  public isFree!: boolean;

  @Column("integer", { nullable: true })
  public recommendations!: number;

  @Column("boolean", { nullable: false, default: false })
  public originAccess!: boolean;

  @Column("boolean", { nullable: false, default: false })
  public originAccessPremier!: boolean;

  @Column("boolean", { nullable: false, default: false })
  public uplayPlus!: boolean;

  @Column("boolean", { nullable: false, default: false })
  public xboxGamePass!: boolean;

  @Column("boolean", { nullable: false, default: false })
  public xboxGamePassUltimate!: boolean;

  @Column("boolean", { nullable: false, default: true })
  public isActive!: boolean;

  // Relations
  @OneToMany((type) => GameOffers, (gameInfos) => gameInfos.gameInfo)
  public gameOffers!: GameOffers[];

  @ManyToOne((type) => GameInfo, (gameInfo) => gameInfo.fullGameId)
  public fullGame?: GameInfo;

  @Column({ nullable: true })
  public fullGameId!: string;
}
