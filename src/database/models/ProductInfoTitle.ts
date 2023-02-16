import {
  Table,
  Column,
  Model,
  AllowNull,
  BelongsToMany,
  HasMany,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Categories from "./Categories.js";
import ProductInfoDescription from "./ProductInfoDescription.js";
import Products from "./Products.js";
import TitlesCategories from "./TitlesCategories.js";

@Table
export default class ProductInfoTitle extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @AllowNull(false)
  @Column
  name!: string;

  @BelongsToMany(() => Categories, () => TitlesCategories)
  categories!: Categories[];

  @HasMany(() => ProductInfoDescription)
  descriptions: ProductInfoDescription[] = [];
}
