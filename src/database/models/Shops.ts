import {
  Table,
  Column,
  Model,
  AllowNull,
  DataType,
} from "sequelize-typescript";

@Table
export default class Shops extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @AllowNull(false)
  @Column
  country!: string;

  @AllowNull(false)
  @Column
  city!: string;

  @AllowNull(false)
  @Column
  adress!: string;

  @AllowNull(false)
  @Column
  postalCode!: string;
}
