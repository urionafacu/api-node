import { Schema, model } from "mongoose";

const StorageSchema = new Schema(
  {
    url: {
      type: String,
    },
    filename: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("storage", StorageSchema);
