import Assets from "../models/assets.js";
import mongoose from "mongoose";

export const searchByNameOrSymbol = async (req, res) => {
  const { q, limit } = req.query;
  try {
    if (q.length < 3) {
      return res.status(406).json({
        status: "bad request",
        message: "The search query must contain at least 3 characters.",
      });
    }

    const docs = await Assets.find({
      $or: [
        {
          name: {
            $regex: q,
            $options: "i",
          },
        },
        {
          symbol: {
            $regex: q,
            $options: "i",
          },
        },
      ],
    }).limit(limit || 10);

    if (docs.length === 0) {
      return res.status(404).json({
        status: "not found",
        message: "Couldn't find a matching asset.",
      });
    }

    return res.status(200).json({ status: "SUCCESS", results: docs });
  } catch (e) {
    return res.status(500).json({
      status: "ERROR",
      message: "An error occurred.",
      errorMessage: e.message,
    });
  }
};

export const getAssetById = async (req, res) => {
  const { assetId } = req.params;
  try {
    if (!mongoose.isValidObjectId(assetId)) {
      return res.status(406).json({
        status: "bad request",
        message: "The provided asset id is invalid.",
      });
    }

    const doc = await Assets.findById(assetId);

    if (!doc) {
      return res.status(404).json({
        status: "not found",
        message: "Couldn't find a matching asset.",
      });
    }

    return res.status(200).json(doc);
  } catch (e) {
    return res.status(500).json({
      status: "ERROR",
      message: "An error occurred.",
      errorMessage: e.message,
    });
  }
};
