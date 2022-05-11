# assetsrepo

## Additional requirements

- git
- jq (sudo apt-get install jq)
- 1GB Space (~300MB for ./resources - ~800MB Temporary for fetching)

## Initial setup

### Install the node modules

```bash
yarn
```

### Create/Update `./resources/blockchains`

```bash
yarn init:blockchains_dir
```

### Create/Update the database collection

```bash
yarn init:blockchains_db
```

## Start

```bash
yarn dev # nodemon
```

```bash
yarn start # node
```

## "./utils" details

### commonUtils.js

JS file that exports variables to use in multiple files.

### CreateOrUpdateBlockchainsDatabase.js

It contains `CreateOrUpdateBlockchainsDatabase(resetCollection: boolean = true) => Promise`

Run the file to reset the data collection and reinsert a new data, or import the function and use it somewhere else.

### deepReadDirectories.js

It contains `deepReadDirectories(dirPath: string) => Array<any>`

Import the function and specify the wanted path to export every directory inside.

### ExtractDirectories.js

It contains `ExtractDirectories(type: string = "json")`

Parameters: `type: string` options: json | file

Run the file to export `./resources/blockchains` directories as JSON file at `./resources/directories.json`, or import the function and use it somewhere else with the parameter value `json`.

### SyncBlockchainsDirectoryWithOrigin.js

It contains `SyncBlockchainsDirectoryWithOrigin() => Promise`

Run the file to update `./resources/blockchains` directories, or import the function and use it somewhere else to call for an update for `./resources/blockchains`.
