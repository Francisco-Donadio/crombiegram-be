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
import Post from "./post.model";
import Like from "./like.model";

export interface UserInterface {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  password: string;
  profileImage?: string;
  position?: string;
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
  @Column
  declare firstName: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  declare lastName: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  declare birthday: Date;

  @AllowNull(false)
  @NotEmpty
  @Column
  declare password: string;

  @AllowNull(true)
  @Column
  declare profileImage: string;

  @AllowNull(true)
  @Column
  declare position: string;

  @HasMany(() => Post)
  declare post: Post[];

  @HasMany(() => Like)
  declare like: Like[];
}
