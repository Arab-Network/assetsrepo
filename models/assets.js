import mongoose from "mongoose";
const { Schema } = mongoose;

const assetModel = new Schema(
  {
    name: String,
    website: String,
    description: String,
    explorer: String,
    research: String,
    symbol: String,
    type: String,
    decimals: Number,
    status: String,
    tags: [String],
    links: [{ name: String, url: String }],
    tokenId: String,
    logoPath: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model("assets", assetModel);
