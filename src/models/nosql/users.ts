import { Schema, model } from "mongoose";
import mongooseDelete from "mongoose-delete";

enum UserEnum {
  ADMIN = "admin",
  USER = "user",
}

type UserModel = {
  name: string;
  age: number;
  email: string;
  password: string;
  role?: UserEnum;
};

const UserSchema: Schema<UserModel> = new Schema(
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
