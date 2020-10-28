import { Entity, Column, OneToMany, ManyToOne, Index } from "typeorm";
import { Base } from "./Base";
import { GameOffers } from "./GameOffers";

@Entity()
export class Store extends Base {
  @Column("text", { nullable: false })
  public name!: string;

  @Column("text", { nullable: true })
  public image!: string;

  @Column("boolean", { nullable: false, default: true })
  public isActive!: boolean;

  @Column("text", { array: true, nullable: true })
  public paymentMethods!: string[];

  @Column("jsonb", {
    default: {
      paypal: { "99999999": { a: 1, b: 0 } },
      creditcard: { "99999999": { a: 1, b: 0 } },
    },
  })
  public fee!: {
    paypal: any;
    creditcard: any;
  };

  // Relations
  @OneToMany((type) => GameOffers, (gameOffers) => gameOffers.store)
  public gameOffers!: GameOffers[];
}
