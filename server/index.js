const express = require("express");
const app = express();

const { redis } = require("./db/db.startup");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./routes")(app);

app.get("/", (req, res) => {
  res.send("Successful response.");
});



app.listen(3000, () => console.log("Example app is listening on port 3000."));
