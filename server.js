// importing http module to create a server and dotenv for reading .env
const http = require("http");
require("dotenv").config();

// try getting a PORT number from .env else use 5001
const PORT = process.env.PORT || 5001;

// creating a server
const server = http.createServer((req, res) => {
  // status code 200 => OK
  res.statusCode = 200;
  // setting content type for the HTTP Header to json
  res.setHeader("Content-Type", "application/json");
  // passing in a message to the browser
  res.write(JSON.stringify({ message: "This is Node.js CRUD API" }));
  // .end() implies nothing more will be written and its the end
  res.end();
});

server.listen(PORT, () => {
  console.log(`Server Started at Port:${PORT}`);
});