import {
  Table,
  Column,
  Model,
  AllowNull,
  DataType,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import Products from "./Products.js";

@Table
export default class ProductImages extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @AllowNull(false)
  @Column
  name!: string;

  @ForeignKey(() => Products)
  @Column({
    type: DataType.UUID,
  })
  productId!: string;

  @BelongsTo(() => Products)
  product!: ReturnType<() => Products>;
}
