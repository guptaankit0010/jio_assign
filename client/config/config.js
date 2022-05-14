const API_SERVER = {
  host: process.env.ENV == "dev" ? "http://localhost" : "http://3.110.114.13",
  port: "3000",
};

const DEFAULTS = {
  NUM_PAGES: process.argv[2] ? process.argv[2] : 5,
};

function getApiUrl(route) {
  return `${API_SERVER.host}:${API_SERVER.port}/${route}`;
}

module.exports = { getApiUrl, DEFAULTS };
