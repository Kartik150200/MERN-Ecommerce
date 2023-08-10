import mongoose from "mongoose";

// store the refresh tokens in the db
const tokenSchema = mongoose.Schema(
  {
    email: {
      type: String,
      requireds: true,
    },
    token: {
      type: String,
      requireds: true,
    },
  },
  { timestamps: true }
);

// delete the refresh tokens every 7 days
tokenSchema.index({ createdAt: 1 }, { expires: "7d" });

const Token = mongoose.model("Token", tokenSchema);

export default Token;
