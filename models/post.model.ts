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
  IsDate,
} from "sequelize-typescript";
import { Optional, UUIDV4 } from "sequelize";
import User from "./user.model";

export interface PostInterface {
  id: string;
  userId: string;
  contentText: string;
  imageName?: string;
}

export interface PostCreationAttributes extends Optional<PostInterface, "id"> {}

@Table({
  tableName: "post",
  timestamps: true,
})
export default class Post extends Model<PostInterface, PostCreationAttributes> {
  @PrimaryKey
  @IsUUID(4)
  @Default(UUIDV4)
  @Column
  declare id: string;

  @AllowNull(false)
  @Column
  declare contentText: string;

  @AllowNull(true)
  @Column
  declare imageName?: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  declare userId: string;

  @BelongsTo(() => User)
  declare user: User;
}
