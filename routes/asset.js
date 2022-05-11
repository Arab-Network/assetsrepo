import express from "express";
import * as AssetController from "../controllers/asset.js";

const router = express.Router();

router.get("/search", AssetController.searchByNameOrSymbol);
router.get("/:assetId", AssetController.getAssetById);

export default router;
