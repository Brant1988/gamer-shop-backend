import {
  Table,
  Column,
  Model,
  HasMany,
  PrimaryKey,
  Unique,
  AllowNull,
  Min,
  Max,
  IsEmail,
  Default,
  HasOne,
  ForeignKey,
  DataType,
} from "sequelize-typescript";
import Orders from "./Orders.js";
import UserAdresses from "./UserAdresses.js";
import UserPeronal from "./UserPersonalInfo.js";

@Table
export default class User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @Unique
  @IsEmail
  @AllowNull(true)
  @Column
  email!: string;

  @AllowNull(true)
  @Min(3)
  @Max(30)
  @Column
  password!: string;

  @Default("USER")
  @Column
  role!: string;

  @ForeignKey(() => UserPeronal)
  @Column({
    type: DataType.UUID,
  })
  personalId!: string;

  @HasOne(() => UserPeronal)
  userPersonal!: UserPeronal;

  @HasOne(() => UserAdresses)
  userAdress!: UserAdresses;

  @HasMany(() => Orders)
  orders: Orders[] = [];
}
