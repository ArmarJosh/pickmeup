var mongojs = require("mongojs");
const connectionString = mongojs ("mongodb://armar:Entrapment@cluster0-shard-00-00-eqzzz.azure.mongodb.net:27017,cluster0-shard-00-01-eqzzz.azure.mongodb.net:27017,cluster0-shard-00-02-eqzzz.azure.mongodb.net:27017/pickmeup?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true");

module.exports = connectionString; 