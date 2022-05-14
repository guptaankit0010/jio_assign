const express = require("express");
const router = express.Router();
const Controller = require("./jobs.controller");

router.get("/", Controller.getJobs, async (req, res, next) => {
  if (req.error) {
    next();
  } else {
    res.send("<pre>" + JSON.stringify(req.filteredData, null, 2) + "</pre>");
  }
});

router.post("/", Controller.saveJobs, async (req, res) => {
  if (req.error) {
    next();
  } else {
    res.send("Data Saved successfully");
  }
});

router.use("/", async (req, res) => {
  if (req.error) {
    res.statusCode = 500;
    res.send("Internal Server Error");
  }
});
module.exports = router;
