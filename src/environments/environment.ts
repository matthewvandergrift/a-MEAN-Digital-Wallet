// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  MONGODB_URI : "mongodb://Admin:M0ng0db1358@mongo-shard-00-00-qlmmr.mongodb.net:27017,mongo-shard-00-01-qlmmr.mongodb.net:27017,mongo-shard-00-02-qlmmr.mongodb.net:27017/test?ssl=true&replicaSet=Mongo-shard-0&authSource=admin&retryWrites=true",
};
