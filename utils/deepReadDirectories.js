import { lstat, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "path";

export const deepReadDirectories = async (dirPath) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!existsSync(dirPath)) {
        return reject({
          status: "ERROR",
          message: `[deepReadDirectories] - The requested directory doesn't exist: ${dirPath}`,
        });
      }

      const mainDir = await readdir(dirPath);
      const scanAll = await Promise.all(
        mainDir.map(async (entity) => {
          const currentPath = join(dirPath, entity);
          return (await lstat(currentPath)).isDirectory()
            ? await deepReadDirectories(currentPath)
            : currentPath.includes("/assets/")
            ? currentPath
            : [];
        })
      );
      return resolve(scanAll);
    } catch (e) {
      return reject(e);
    }
  });
};
