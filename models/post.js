import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    authorId: { type: Schema.Types.ObjectId, ref: "User" },
    image: String,
    content: String,
    likedByUsers: { type: [Schema.Types.ObjectId], default: [] },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    virtuals: {
      likes: {
        get() {
          return this.likedByUsers.length;
        },
      },
    },
    methods: {
      checkIsUserLiked(userId) {
        return this.likedByUsers.includes(userId);
      },
    },
  }
);

export default model("Post", postSchema);
