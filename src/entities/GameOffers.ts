import { Entity, Column, OneToMany, ManyToOne, Index } from "typeorm";
import { Base } from "./Base";
import { GameInfo } from "./GameInfo";
import { Store } from "./Store";

@Entity()
export class GameOffers extends Base {
  @Column("varchar", { length: 512, nullable: false })
  public rawName!: string;

  @Column("varchar", { length: 255, nullable: true, default: null })
  public edition!: string;

  @Column("boolean")
  public inStock!: boolean;

  @Column("text", { nullable: true })
  public inStockText!: string | null;

  @Column("decimal", { precision: 8, scale: 2, default: null })
  public price!: number;

  @Column("boolean", { default: false, nullable: false })
  public isFree!: boolean;

  @Column("varchar", { default: null, nullable: true })
  public region!: string;

  @Column("varchar", { default: null, nullable: true })
  public platform!: string;

  @Column("varchar", { length: 512, unique: true })
  @Index({ unique: true })
  public url!: string;

  @Column("boolean", { default: true, nullable: false })
  public isActive!: boolean;

  @Column("integer", { nullable: false })
  public tabId!: number;

  // Relations
  @Column({ nullable: false })
  @Index()
  public gameInfoId!: string;

  @ManyToOne((type) => GameInfo, (gameInfos) => gameInfos.gameOffers)
  public gameInfo!: GameInfo;

  @Column({ nullable: false })
  @Index()
  public storeId!: string;

  @ManyToOne((type) => Store, (store) => store.gameOffers)
  public store!: Store;
}
