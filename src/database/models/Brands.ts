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
import Categories from "./Categories.js";
import Products from "./Products.js";

@Table
export default class Brands extends Model {
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
  products: Products[] = [];

  @BelongsToMany(() => Categories, () => BrandCategory)
  categories!: Categories[];
}
