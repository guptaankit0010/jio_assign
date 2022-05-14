const puppeteer = require("puppeteer");
const { saveJobs } = require("./api/jobs");
const { DEFAULTS } = require("./config/config");

async function startBrowser() {
  let browser;
  try {
    console.log("Opening the browser......");
    browser = await puppeteer.launch({
      headless: false,
      args: ["--disable-setuid-sandbox"],
      ignoreHTTPSErrors: true,
    });
  } catch (err) {
    console.log("Could not create a browser instance => : ", err);
  }

  return browser;
}

async function scrapeAll(browserInstance) {
  let browser;
  try {
    browser = await browserInstance;
    await scraperObject.scraper(browser);
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
  }
}

const scraperObject = {
  url: "https://www.naukri.com/nodejs-jobs",
  async scraper(browser) {
    let page = await browser.newPage();
    for (let i = 1; i <= DEFAULTS.NUM_PAGES; i++) {
      console.log(`Navigating to ${this.url}-${i}...`);
      await page.goto(`${this.url}-${i}`);
      await page.waitForSelector("section.listContainer .list > article");
      await page.waitForSelector(
        "#root > div.search-result-container > div.content > section.listContainer.fleft > div.list > article:nth-child(1) > div.jobTupleFooter.mt-20 > div.type.br2.fleft.grey > span"
      );
      let jobs = await page.$$eval(
        "section.listContainer .list > article",
        (jobList) => {
          jobList = jobList.map((el) => {
            console.log(el);
            let jobTitle = el.querySelector(
              "div.jobTupleHeader > div > a"
            ).title;
            let jobCompany = el.querySelector(
              "div.jobTupleHeader > div > div > a.subTitle.ellipsis.fleft"
            ).title;
            let jobLoc = el.querySelector(
              "div.jobTupleHeader > div > ul > li.fleft.grey-text.br2.placeHolderLi.location > span"
            ).title;
            let jobExp = el.querySelector(
              "div.jobTupleHeader > div > ul > li.fleft.grey-text.br2.placeHolderLi.experience > span"
            ).title;
            let jobSalary = el.querySelector(
              "div.jobTupleHeader > div > ul > li.fleft.grey-text.br2.placeHolderLi.salary > span"
            ).title;
            let jobPostDays = el
              .querySelector(
                "div.jobTupleFooter.mt-20 > div.type.br2.fleft > i.naukicon-history"
              )
              .parentNode.getElementsByTagName("span")[0].textContent;
            return {
              title: jobTitle,
              company: jobCompany,
              loc: jobLoc,
              exp: jobExp,
              jobSalary: jobSalary,
              jobPostDays: jobPostDays,
            };
          });

          return jobList;
        }
      );
    //   console.log(jobs);

      await saveJobs({
        key: `page${i}`,
        data: jobs,
      });
    }
  },
};

let browserInstance = startBrowser();

// Pass the browser instance to the scraper controller
scrapeAll(browserInstance);
