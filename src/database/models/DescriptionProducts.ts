import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
} from "sequelize-typescript";
import ProductInfoDescription from "./ProductInfoDescription.js";
import Products from "./Products.js";

@Table
export default class DescriptionsProducts extends Model {
  @ForeignKey(() => Products)
  @Column({
    type: DataType.UUID,
  })
  productId!: string;

  @ForeignKey(() => ProductInfoDescription)
  @Column({
    type: DataType.UUID,
  })
  prodInfoDescriptionsId!: string;
}
