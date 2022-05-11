import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { __dirname } from "./commonUtils.js";
import { ExtractDirectories } from "./ExtractDirectories.js";
import { DatabaseConnect } from "../db/index.js";
import Assets from "../models/assets.js";
import LoggerService from "../logger/LoggerService.js";

export const CreateOrUpdateBlockchainsDatabase = async (
  resetCollection = true
) => {
  try {
    DatabaseConnect();

    if (resetCollection) {
      const deleteAll = await Assets.deleteMany({});
      LoggerService.info(
        `Deleted ${deleteAll.deletedCount} documents from the collection.`
      );
    }

    const directories = await ExtractDirectories("json");

    console.time("Adding items to the database");
    for (const infoFile of directories) {
      const directory = infoFile.split("\\").slice(0, -1).join("/");
      const infoFileData = JSON.parse(fs.readFileSync(infoFile));
      if (fs.existsSync(directory + "/logo.png")) {
        infoFileData.logoPath =
          directory.replace(__dirname.split("\\").join("/"), "") + "/logo.png";
      }

      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
      process.stdout.write((directories.indexOf(infoFile) + 1).toString());
      process.stdout.cursorTo(6);
      process.stdout.write(directory);

      await Assets.create(infoFileData);
    }
    process.stdout.write("\n");
    console.timeEnd("Adding items to the database");

    return {
      status: "SUCCESS",
      message:
        "[CreateOrUpdateBlockchainsDatabase] - The function ran successfully.",
    };
  } catch (e) {
    return {
      status: "ERROR",
      message: `[CreateOrUpdateBlockchainsDatabase] - ${e.message}`,
    };
  }
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const status = await CreateOrUpdateBlockchainsDatabase(true);
  LoggerService.info(status);
}
