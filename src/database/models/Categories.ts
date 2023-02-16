import {
  Table,
  Column,
  Model,
  AllowNull,
  Unique,
  HasMany,
  BelongsToMany,
  DataType,
} from "sequelize-typescript";

import BrandCategory from "./BrandCategory.js";
import Brands from "./Brands.js";
import ProductInfoTitle from "./ProductInfoTitle.js";
import Products from "./Products.js";
import TitlesCategories from "./TitlesCategories.js";

@Table
export default class Categories extends Model {
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

  @HasMany(() => Products)
  products!: Products[];

  @BelongsToMany(() => ProductInfoTitle, () => TitlesCategories)
  prodInfoTitles!: ProductInfoTitle[];

  @BelongsToMany(() => Brands, () => BrandCategory)
  brands!: Brands[];
}
