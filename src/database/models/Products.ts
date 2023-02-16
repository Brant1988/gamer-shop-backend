import {
  Table,
  Column,
  Model,
  AllowNull,
  Unique,
  Default,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  DataType,
  HasMany,
  HasOne,
} from "sequelize-typescript";
import Brands from "./Brands.js";
import Categories from "./Categories.js";
import Orders from "./Orders.js";
import OrderedProducts from "./OrderedProducts.js";
import ProductInfoDescription from "./ProductInfoDescription.js";
import ProductImages from "./ProductImages.js";
import DescriptionsProducts from "./DescriptionProducts.js";
import AmountOrderedProducts from "./AmountOrderedProducts.js";

@Table
export default class Products extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @Unique
  @AllowNull(false)
  @Column
  name!: string;

  @Unique
  @AllowNull(false)
  @Column
  description!: string;

  @AllowNull(false)
  @Column
  price!: number;

  @AllowNull(true)
  @Column
  oldPrice!: number;

  @Default(false)
  @Column
  isOnSale!: boolean;

  @ForeignKey(() => Categories)
  @Column({
    type: DataType.UUID,
  })
  categoryId!: string;

  @ForeignKey(() => Brands)
  @Column({
    type: DataType.UUID,
  })
  brandId!: string;

  @BelongsToMany(() => Orders, () => OrderedProducts)
  orders!: Orders[];

  @BelongsTo(() => Categories)
  category!: ReturnType<() => Categories>;

  @BelongsTo(() => Brands)
  brand!: ReturnType<() => Brands>;

  @BelongsToMany(() => ProductInfoDescription, () => DescriptionsProducts)
  productDescriptions!: ProductInfoDescription[];

  @HasMany(() => ProductImages)
  images: ProductImages[] = [];

  @HasOne(() => AmountOrderedProducts)
  amount!: AmountOrderedProducts;
}
