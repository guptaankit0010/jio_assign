const redis = require("redis");
const client = redis.createClient();

function Redis() {
  client.connect();
  this.client = client;
  client.on("error", (err) => console.log("Redis Client Error", err));
  client.on("connect", () => console.log("Redis Client Connect"));
}

Redis.prototype.set = async function set(key, value) {
  await this.client.set(key, value);
};

Redis.prototype.get = async function get(key) {
  return await this.client.get(key);
};

Redis.prototype.getAllKeys = async function getAllKeys(key) {
  let keys = await this.client.keys("*");
  let filteredKeys = keys.filter(function (item) {
    return item.indexOf(key) > -1;
  });
  return filteredKeys;
};

module.exports = Redis;
