import { readFileSync, writeFileSync } from "fs";
import { deepReadDirectories } from "./utils/deepReadDirectories.js";
import { DatabaseConnect } from "./db/index.js";

try {
  console.time("Scan for directories and create directories.json");
  const jsonFilesList = await deepReadDirectories("blockchains");
  const flattenedList = jsonFilesList.flat(Number.POSITIVE_INFINITY);
  console.log(`Found ${flattenedList.length} info.json files.`);
  const json = JSON.stringify(flattenedList);
  writeFileSync("./directories.json", json, "utf8");
  console.timeEnd("Scan for directories and create directories.json");

  DatabaseConnect();

  const data = readFileSync("blockchains\\aeternity\\info\\info.json", {
    encoding: "utf8",
    flag: "r",
  });
  console.log(data);
} catch (err) {
  console.error(err);
}
