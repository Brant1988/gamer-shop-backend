import {
  Table,
  Column,
  Model,
  AllowNull,
  BelongsTo,
  ForeignKey,
  DataType,
} from "sequelize-typescript";
import User from "./User.js";

@Table
export default class UserAdresses extends Model {
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

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  userId!: string;

  @BelongsTo(() => User)
  user!: ReturnType<() => User>;
}
