import { Schema, model } from "mongoose";
import mongooseDelete from "mongoose-delete";

export type StorageModel = {
  url: string;
  filename: string;
};

const StorageSchema: Schema<StorageModel> = new Schema(
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

StorageSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
});

export default model("storage", StorageSchema);
