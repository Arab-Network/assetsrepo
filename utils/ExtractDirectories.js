import shell from "shelljs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { deepReadDirectories } from "./deepReadDirectories.js";
import { __dirname, resourcesPath } from "./commonUtils.js";
import LoggerService from "../logger/LoggerService.js";

export const ExtractDirectories = async (type = "json") => {
  try {
    const jsonFilesList = await deepReadDirectories(
      path.join(resourcesPath, "blockchains")
    );
    const flattenedFilesList = jsonFilesList.flat(Number.POSITIVE_INFINITY);

    if (type === "json") {
      return flattenedFilesList;
    }

    if (!shell.which("jq")) {
      return {
        status: "ERROR",
        message:
          '[ExtractDirectories] - "jq" is not installed and is required for formatting.',
      };
    }

    const jsonString = JSON.stringify(flattenedFilesList);
    const tempJsonPath = path.join(resourcesPath, "directories_temp.json");

    fs.writeFileSync(tempJsonPath, jsonString, "utf8");
    shell.exec(
      `jq "." ${tempJsonPath} > ${path.join(resourcesPath, "directories.json")}`
    );
    shell.rm("-rf", tempJsonPath);

    return {
      status: "SUCCESS",
      message: "[ExtractDirectories] - The function ran successfully.",
    };
  } catch (e) {
    return {
      status: "ERROR",
      message: `[ExtractDirectories] - ${e.message}`,
    };
  }
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const status = ExtractDirectories("file");
  LoggerService.info(status);
}
