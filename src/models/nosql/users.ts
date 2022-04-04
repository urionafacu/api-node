import { Schema, model } from "mongoose";
import mongooseDelete from "mongoose-delete";

export enum UserEnum {
  ADMIN = "admin",
  USER = "user",
}

export type UsersModel = {
  name: string;
  age: number;
  email: string;
  password: string;
  role?: UserEnum;
};

const UserSchema: Schema<UsersModel> = new Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    role: {
      type: [UserEnum.ADMIN, UserEnum.USER],
      default: UserEnum.USER,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
});

export default model("users", UserSchema);
