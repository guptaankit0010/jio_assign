const { redis } = require("../../db/db.startup");
const { MAX_JOBS } = require("./defaults");

async function getPageData(page) {
  let key = `page${page}`;
  let data = JSON.parse(await redis.get(key));
  return data;
}

function sortJobsByDate(jobs = []) {
  jobs.sort(function (a, b) {
    if (!a || !b) {
      return -1;
    }
    let a_jobPostDays_Int = parseInt(a.jobPostDays.split(" ")[0]);
    let b_jobPostDays_Int = parseInt(b.jobPostDays.split(" ")[0]);
    if (a_jobPostDays_Int < b_jobPostDays_Int) {
      return -1;
    }
    if (a_jobPostDays_Int > b_jobPostDays_Int) {
      return 1;
    }
    return 0;
  });
  return jobs;
}

function filterJobsByLoc(jobs = [], location) {
  let filteredJobs = jobs.filter(function (job) {
    return job.loc.search(new RegExp(location, "i")) > -1;
  });
  return filteredJobs;
}

exports.getJobs = async function (req, res, next) {
  console.log(req.query);
  //   req.error = "Test";
  try {
    let page =
      req.query.page && req.query.page != "" ? parseInt(req.query.page) : null;
    let location = req.query.location ? req.query.location : null;

    let data = [];
    let allKeys = await redis.getAllKeys();
    let filteredData = [];

    if (!page) {
      for (let i = 1; i <= allKeys.length; i++) {
        data = data.concat(await getPageData(i));
      }
      filteredData = data;
      if (location) {
        filteredData = filterJobsByLoc(data, location);
      }
      filteredData = sortJobsByDate(filteredData);
      filteredData.splice(MAX_JOBS);
    } else {
      for (let i = page; i <= allKeys.length; i++) {
        let data = await getPageData(i);
        let nextPagefilteredData = filterJobsByLoc(data, location);
        filteredData = filteredData.concat(nextPagefilteredData);
        if (filteredData.length >= MAX_JOBS) {
          console.log("got required no of jobs");
          break;
        }
      }
    }
    req.filteredData = filteredData;
  } catch (error) {
    console.log(error);
    req.error = error;
  }

  next();
};

exports.saveJobs = async function (req, res, next) {
  try {
    await redis.set(req.body.key, JSON.stringify(req.body.data));
  } catch (error) {
    console.log(error);
    req.error = error;
  }

  next();
};
