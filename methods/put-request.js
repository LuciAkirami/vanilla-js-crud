// Get Requests does the Following
//  /api/movies/4
//  data = {"releaseYear": 2011} -> will update the release year in 4th part of f&f

const bodyParser = require("../utils/body-parser");
const fileWriter = require("../utils/write-to-file");

module.exports = async (req, res) => {
  baseURL = req.url.split("/").slice(0, 3).join("/") + "/";

  const part = req.url.split("/")[3]; // ["","api","movies","1"][3] -> 1

  // eg: localhost:PORT/api/movies/1/mainCharacters
  const info = req.url.split("/")[4]; // ["","api","movies","1","mainCharacters"][4] -> mainCharacters
  if (baseURL === "/api/movies/") {
    // part cannot be 0 or less and there is no 0 part of f&f movie
    // as the data contains only f&f movies, the movies.length represents the last part
    // filtering through each movie
    filteredData = req.movies.filter((movie) => {
      return movie.part == part; // returns a list with one element containing the f&f movie part
    });
    index = req.movies.findIndex((movie) => {
      return movie.part == part; // returns an index if the given id exists, else returns -1
    });
    // check if the user is asking any particular information about that part of the f&f movie
    if (filteredData.length == 1 && info) {
      if (filteredData[0][info]) {
        let newParam = await bodyParser(req);
        if (newParam[info]) {
          // modify the existing paramter in the movies
          req.movies[index][info] = newParam[info];
          // write this new data to the json file
          fileWriter(req.movies);
          res.statusCode = 200;
          res.write(JSON.stringify(req.movies[index][info]));
          res.end();
        } else {
          res.statusCode = 404;
          res.write(
            JSON.stringify({ title: "Not Found", message: "Wrong Content" })
          );
          res.end();
        }
      } else {
        res.statusCode = 404;
        res.write(
          JSON.stringify({
            title: "Not Found",
            message: "Field Doesn't Exists",
          })
        );
        res.end();
      }
    } else {
      res.statusCode = 404;
      res.write(
        JSON.stringify({
          title: "Not Found",
          message: "Movie not Found",
        })
      );
      res.end();
    }
  } else {
    // 404 Error when URL not found (any URL other than "/api/movies" or "/api/movies/[1-9]")
    res.statusCode = 404;
    res.write(
      JSON.stringify({ title: "Not Found", message: "Route Not Found" })
    );
    // another way of sending response
    //res.writeHead(404, { "Content-Type": "application/json" });
    res.end();
  }
};
