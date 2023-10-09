const fileWriter = require("../utils/write-to-file");

module.exports = (req, res) => {
  // below is a better approach, eg: /api/movies/1/director
  // after split ["","api","movies","1","director"] -> slice -> ["","api","movies"] -> join -> /api/movies
  let baseURL = req.url.split("/").slice(0, 3).join("/");

  // part is the part of the f&f movie, if the user wants a specific part
  if (req.url.split("/").length > 3) {
    baseURL = req.url.split("/").slice(0, 3).join("/") + "/";
  }

  const part = req.url.split("/")[3]; // ["","api","movies","1"][3] -> 1

  if (baseURL === "/api/movies/" && 0 < part && part <= req.movies.length) {
    // part cannot be 0 or less and there is no 0 part of f&f movie
    // as the data contains only f&f movies, the movies.length represents the last part
    // finding the index of movie, which matches the part
    index = req.movies.findIndex((movie) => {
      return movie.part == part; // returns an index if the given id exists, else returns -1
    });
    // checking if it's present or not
    if (index != -1) {
      // remove the value at the index, 1 because the part occurs only once
      req.movies.splice(index, 1);
      // updating the json file
      //fileWriter(req.movies);
      res.statusCode = 204; // 204 -> No Content
      res.write(JSON.stringify(req.movies));
      res.end();
    } else {
      res.statusCode = 404;
      res.write({ title: "Not Found", message: "Movie/Part Not Found" });
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
