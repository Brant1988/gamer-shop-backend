import {
  Table,
  Column,
  Model,
  AllowNull,
  BelongsTo,
  ForeignKey,
  BelongsToMany,
  DataType,
} from "sequelize-typescript";
import Orders from "./Orders.js";
import Products from "./Products.js";

@Table
export default class AmountOrderedProducts extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @AllowNull(false)
  @Column
  amount!: number;

  @ForeignKey(() => Products)
  @Column({
    type: DataType.UUID,
  })
  productId!: string;

  @BelongsTo(() => Products)
  product!: ReturnType<() => Products>;

  @ForeignKey(() => Orders)
  @Column
  orderId!: number;

  @BelongsTo(() => Orders)
  order!: ReturnType<() => Orders>;
}
