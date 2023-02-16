import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
} from "sequelize-typescript";
import Categories from "./Categories.js";
import ProductInfoTitle from "./ProductInfoTitle.js";

@Table
export default class TitlesCategories extends Model {
  @ForeignKey(() => Categories)
  @Column({
    type: DataType.UUID,
  })
  categoryId!: string;

  @ForeignKey(() => ProductInfoTitle)
  @Column({
    type: DataType.UUID,
  })
  prodInfoTitleId!: string;
}
