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
import Post from "./post.model";

export interface LikeInterface {
  id: string;
  userId: string;
  postId: string;
}

export interface LikeCreationAttributes extends Optional<LikeInterface, "id"> {}

@Table({
  tableName: "like",
  timestamps: true,
})
export default class Like extends Model<LikeInterface, LikeCreationAttributes> {
  @PrimaryKey
  @IsUUID(4)
  @Default(UUIDV4)
  @Column
  declare id: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  declare userId: string;

  @BelongsTo(() => User)
  declare user: User;

  @ForeignKey(() => Post)
  @AllowNull(false)
  @Column
  declare postId: string;

  @BelongsTo(() => Post)
  declare post: Post;
}
