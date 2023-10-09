const bodyParser = require("../utils/body-parser");
const fileWriter = require("../utils/write-to-file");

module.exports = async (req, res) => {
  if (req.url == "/api/movies") {
    try {
      let body = await bodyParser(req);
      // appending the movie "part", there are 9 F&F movies,
      // if you post a new one, it will be F&F "part" "10"
      let part = String(req.movies.length + 1);
      body.part = part;
      // adding the new part to the movie data stored in "req"
      req.movies.push(body);
      // adding the new part to fastandfurious.json
      fileWriter(req.movies);
      // console.log(body);
      // if POST is successfull, 201 -> content is created
      res.writeHead(201, { "Content-type": "application/json" });
      res.write(JSON.stringify(body));
      res.end();
    } catch (err) {
      // if any Error occured, 401 -> validation error
      res.statusCode = 401;
      res.write(
        JSON.stringify({
          title: "Not Valid",
          message: "Request Body is not valid",
        })
      );
      res.end();
    }
  } else {
    res.statusCode = 404;
    res.write(
      JSON.stringify({
        title: "Not Found",
        message: "Route not Found",
      })
    );
    res.end();
  }
};
