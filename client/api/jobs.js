const config = require("../config/config");
const axios = require("axios").default;

function saveJobs(data) {
  axios
    .post(config.getApiUrl("jobs"), data)
    .then(function (response) {
        console.log(response.data)   
    })
    .catch(function (error) {
      console.log(error);
    });
}

module.exports = { saveJobs };
