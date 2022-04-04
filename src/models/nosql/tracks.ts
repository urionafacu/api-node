import { Schema, model, Types } from "mongoose";
import mongooseDelete from "mongoose-delete";

export type TracksModel = {
  name: string;
  album: string;
  cover: string;
  artist: string;
  duration: {
    start: number;
    end: number;
  };
  mediaId?: Types.ObjectId;
};

const TracksSchema: Schema<TracksModel> = new Schema(
  {
    name: {
      type: String,
    },
    album: {
      type: String,
    },
    cover: {
      type: String,
      validate: {
        validator: () => true,
        message: "ERROR_URL",
      },
    },
    artist: {
      name: {
        type: String,
      },
      nickname: {
        type: String,
      },
      nationality: {
        type: String,
      },
    },
    duration: {
      start: {
        type: Number,
      },
      end: {
        type: Number,
      },
    },
    mediaId: {
      type: Types.ObjectId,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

TracksSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
});

export default model("tracks", TracksSchema);
