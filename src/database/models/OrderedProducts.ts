import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
} from "sequelize-typescript";
import Orders from "./Orders.js";
import Products from "./Products.js";

@Table
export default class OrderedProducts extends Model {
  @ForeignKey(() => Orders)
  @Column
  orderId!: number;

  @ForeignKey(() => Products)
  @Column({
    type: DataType.UUID,
  })
  productId!: string;
}
