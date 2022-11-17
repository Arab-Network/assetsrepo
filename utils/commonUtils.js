import path from "node:path";

export const __dirname = path.resolve();
export const resourcesPath = path.join(__dirname);
export const tempRepoPath = path.join(
  __dirname,

  "blockchains_temp_fetching_repo"
);
