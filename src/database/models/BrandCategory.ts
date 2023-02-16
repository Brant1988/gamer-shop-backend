import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
} from "sequelize-typescript";
import Brands from "./Brands.js";
import Categories from "./Categories.js";

@Table
export default class BrandCategory extends Model {
  @ForeignKey(() => Brands)
  @Column({
    type: DataType.UUID,
  })
  brandId!: string;

  @ForeignKey(() => Categories)
  @Column({
    type: DataType.UUID,
  })
  categoryId!: string;
}
