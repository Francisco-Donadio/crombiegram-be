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

export interface CommentInterface {
  id: string;
  userId: string;
  comment: string;
  postId: string;
}

export interface CommentCreationAttributes
  extends Optional<CommentInterface, "id"> {}

@Table({
  tableName: "comment",
  timestamps: true,
})
export default class Comment extends Model<
  CommentInterface,
  CommentCreationAttributes
> {
  @PrimaryKey
  @IsUUID(4)
  @Default(UUIDV4)
  @Column
  declare id: string;

  @AllowNull(false)
  @Column
  declare comment: string;

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
