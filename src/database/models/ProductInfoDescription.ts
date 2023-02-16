import {
  Table,
  Column,
  Model,
  AllowNull,
  BelongsTo,
  ForeignKey,
  DataType,
  BelongsToMany,
} from "sequelize-typescript";
import DescriptionsProducts from "./DescriptionProducts.js";
import ProductInfoTitle from "./ProductInfoTitle.js";
import Products from "./Products.js";

@Table
export default class ProductInfoDescription extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @AllowNull(false)
  @Column
  name!: string;

  @ForeignKey(() => ProductInfoTitle)
  @Column({
    type: DataType.UUID,
  })
  productInfoTitleId!: string;

  @BelongsTo(() => ProductInfoTitle)
  productInfoTitle!: ReturnType<() => ProductInfoTitle>;

  @BelongsToMany(() => Products, () => DescriptionsProducts)
  products!: Products[];
}
