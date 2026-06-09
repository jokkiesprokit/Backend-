const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

// SAVE REQUEST
app.post("/submit-request", (req, res) => {

  const newRequest = {
    id: Date.now(),
    data: req.body
  };

  let allRequests = [];

  // read existing data if exists
  if (fs.existsSync("requests.json")) {
    allRequests = JSON.parse(fs.readFileSync("requests.json"));
  }

  // add new request
  allRequests.push(newRequest);

  // save back to file
  fs.writeFileSync("requests.json", JSON.stringify(allRequests, null, 2));

  res.json({
    success: true,
    message: "Request received"
  });
});

// VIEW ALL REQUESTS (ADMIN)
app.get("/requests", (req, res) => {

  if (!fs.existsSync("requests.json")) {
    return res.json([]);
  }

  const data = JSON.parse(fs.readFileSync("requests.json"));

  res.json(data);
});

// start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
