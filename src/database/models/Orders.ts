import {
  Table,
  Column,
  Model,
  AllowNull,
  BelongsTo,
  ForeignKey,
  BelongsToMany,
  DataType,
  HasMany,
  AutoIncrement,
} from "sequelize-typescript";
import AmountOrderedProducts from "./AmountOrderedProducts.js";
import OrderedProducts from "./OrderedProducts.js";
import Products from "./Products.js";
import User from "./User.js";

@Table
export default class Orders extends Model {
  @AutoIncrement
  @Column({
    primaryKey: true,
  })
  id!: number;

  @AllowNull(false)
  @Column
  delivery!: boolean;

  @AllowNull(false)
  @Column
  status!: string;

  @AllowNull(false)
  @Column
  userName!: string;

  @AllowNull(false)
  @Column
  userSurname!: string;

  @AllowNull(false)
  @Column
  country!: string;

  @AllowNull(false)
  @Column
  email!: string;

  @AllowNull(false)
  @Column
  city!: string;

  @AllowNull(true)
  @Column
  adress!: string;

  @AllowNull(true)
  @Column
  postalCode!: string;

  @AllowNull(false)
  @Column
  phone!: string;

  @AllowNull(false)
  @Column
  summary!: string;

  @BelongsToMany(() => Products, () => OrderedProducts)
  products!: Products[];

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  userId!: string;

  @BelongsTo(() => User)
  user!: ReturnType<() => User>;

  @HasMany(() => AmountOrderedProducts)
  amounts: AmountOrderedProducts[] = [];
}
