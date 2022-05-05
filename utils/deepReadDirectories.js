import { lstat, readdir } from "fs/promises";
import { join } from "path";

export const deepReadDirectories = async (dirPath) => {
  return new Promise(async (resolve, reject) => {
    try {
      const mainDir = await readdir(dirPath);
      const scanAll = await Promise.all(
        mainDir.map(async (entity) => {
          const currentPath = join(dirPath, entity);
          return (await lstat(currentPath)).isDirectory()
            ? await deepReadDirectories(currentPath)
            : (currentPath.includes("\\info\\") |
                (currentPath.includes("\\assets\\") &
                  !currentPath.includes("\\validators\\"))) &
              !currentPath.includes("\\logo.")
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
