import mongoose from "mongoose";
const { Schema } = mongoose;

const assetModel = new Schema(
  {
    name: String,
    website: String,
    description: String,
    explorer: String,
    research: { type: String, required: false },
    symbol: String,
    type: String,
    decimals: Number,
    status: String,
    tags: [String],
    links: [{ name: String, url: String }],
    id: String,
    logoPath: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("assets", assetModel);
