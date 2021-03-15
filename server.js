// Setup empty JS object to act as endpoint for all routes
let projectData = {
  ahmed: "gomaa",
};

// Require Express to run server and routes
const ex = require("express");
const corss = require("cors");
const bodyParser = require("body-parser");

//constants
const port = 8888;
const host = "127.0.0.1";
const app = ex();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(corss());

/* Middleware*/
function callBackListen() {
  console.log("server is running at link");
  console.log(`http://${host}:${port}`);
}

// Initialize the main project folder
app.use(ex.static("website"));

// Setup Server
app.listen(port, host, callBackListen);

app.get("/all", (req, res) => {
  res.send(projectData);
});

app.post("/setData", (req, res) => {
  projectData = req.body;
  res.send(projectData);
});
