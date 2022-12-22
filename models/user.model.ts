import {
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  Column,
  AllowNull,
  NotEmpty,
  BelongsTo,
  ForeignKey,
  IsUUID,
  Default,
  BelongsToMany,
  HasMany,
  IsEmail,
  Unique,
} from "sequelize-typescript";
import { Optional, UUIDV4 } from "sequelize";

export interface UserInterface {
  id: string;
  email: string;
  username: string;
  password: string;
}

export interface UserCreationAttributes extends Optional<UserInterface, "id"> {}

@Table({
  tableName: "user",
  timestamps: true,
})
export default class User extends Model<UserInterface, UserCreationAttributes> {
  @PrimaryKey
  @IsUUID(4)
  @Default(UUIDV4)
  @Column
  declare id: string;

  @AllowNull(false)
  @NotEmpty
  @IsEmail
  @Unique
  @Column
  declare email: string;

  @AllowNull(false)
  @NotEmpty
  @Unique
  @Column
  declare username: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  declare password: string;
}
