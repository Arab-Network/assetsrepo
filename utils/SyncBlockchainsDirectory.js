import shell from "shelljs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { __dirname, resourcesPath, tempRepoPath } from "./commonUtils.js";

export const SyncBlockchainsDirectory = () => {
  return new Promise((resolve, reject) => {
    try {
      if (!shell.which("git")) {
        return reject({
          status: "ERROR",
          message: '[SyncBlockchainsDirectory] - "git" is not installed.',
        });
      }

      if (!fs.existsSync(tempRepoPath)) {
        shell.mkdir(tempRepoPath);
        shell.cd(tempRepoPath);

        shell.exec("git init");
        shell.exec(
          'git remote add origin "https://github.com/trustwallet/assets.git"'
        );

        shell.exec('git sparse-checkout set "blockchains"');
      } else {
        shell.cd(tempRepoPath);
      }

      console.time("Pulling the latest origin version");
      console.log(
        "Fetching from origin (branch: master), this process may take a while."
      );
      shell.exec("git pull origin master");
      console.timeEnd("Pulling the latest origin version");

      console.time(
        'Copying "blockchains" to the main directory and deleting "blockchains_temp_fetching_repo"'
      );
      console.log(
        "Copying and deleting directories, this process may take a while."
      );
      shell.cp("-rf", path.join(tempRepoPath, "blockchains"), resourcesPath);
      shell.cd(__dirname);
      shell.rm("-rf", tempRepoPath);
      console.timeEnd(
        'Copying "blockchains" to the main directory and deleting "blockchains_temp_fetching_repo"'
      );

      return resolve({
        status: "SUCCESS",
        message: "[SyncBlockchainsDirectory] - The function ran successfully.",
      });
    } catch (e) {
      return reject({
        status: "ERROR",
        message: `[SyncBlockchainsDirectory] - ${e.message}`,
      });
    }
  });
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await SyncBlockchainsDirectory();
}
