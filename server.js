// importing http module to create a server and dotenv for reading .env
const http = require("http");
require("dotenv").config();

// importing the data. using "let" because we may have to update the data when using POST/PUT command
let fastAndFurious = require("./data/fastandfurious.json");

// importing functions to perform CRUD operations
const getRequest = require("./methods/get-request");
const postRequest = require("./methods/post-request");
const putRequest = require("./methods/put-request");

// try getting a PORT number from .env else use 5001
const PORT = process.env.PORT || 5001;

// creating a server
const server = http.createServer((req, res) => {
  req.movies = fastAndFurious;
  switch (req.method) {
    case "GET":
      getRequest(req, res);
      break;
    case "POST":
      postRequest(req, res);
      break;
    case "PUT":
      putRequest(req, res);
      break;
    default:
      res.statusCode = 404;
      // setting content type for the HTTP Header to json
      res.setHeader("Content-Type", "application/json");
      // passing in a message to the browser
      res.write(JSON.stringify({ title: "ERROR", message: "Invalid Method" }));
      // .end() implies nothing more will be written and its the end
      res.end();
  }
  // // status code 200 => OK
  // res.statusCode = 200;
  // // setting content type for the HTTP Header to json
  // res.setHeader("Content-Type", "application/json");
  // // passing in a message to the browser
  // res.write(JSON.stringify({ message: "This is Node.js CRUD API" }));
  // // .end() implies nothing more will be written and its the end
  // res.end();
});

server.listen(PORT, () => {
  console.log(`Server Started at Port:${PORT}`);
});
