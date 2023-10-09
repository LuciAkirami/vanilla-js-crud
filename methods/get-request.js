// Get Requests does the Following
// /api/movies -> gets all the fast and furious movies
// /api/movies/4 -> gets the 4th part of fast and furious movies

module.exports = (req, res) => {
  // eg: localhost:PORT/api/movies/1
  // console.log(req.url); // this will be "/api/movies/1"
  // const baseURL = req.url.substring(0, req.url.lastIndexOf("/") + 1); // this will be "/api/movies/"

  // the fails when base URL = /api/movies/1/director, then baseURL becomes "/api/movies/1"
  // below is a better approach, eg: /api/movies/1/director
  // after split ["","api","movies","1","director"] -> slice -> ["","api","movies"] -> join -> /api/movies
  let baseURL = req.url.split("/").slice(0, 3).join("/");
  // console.log(req.url.split("/").slice(0, 3).join("/"));

  // part is the part of the f&f movie, if the user wants a specific part
  if (req.url.split("/").length > 3) {
    baseURL = req.url.split("/").slice(0, 3).join("/") + "/";
    //console.log("Hello", baseURL);
  }

  const part = req.url.split("/")[3]; // ["","api","movies","1"][3] -> 1

  // eg: localhost:PORT/api/movies/1/mainCharacters
  const info = req.url.split("/")[4]; // ["","api","movies","1","mainCharacters"][4] -> mainCharacters
  if (req.url === "/api/movies") {
    // status code 200 => OK
    res.statusCode = 200;
    // setting content type for the HTTP Header to json
    res.setHeader("Content-Type", "application/json");
    // passing in a message to the browser
    res.write(JSON.stringify(req.movies));
    // .end() implies nothing more will be written and its the end
    res.end();
  } else if (
    baseURL === "/api/movies/" &&
    0 < part &&
    part <= req.movies.length
  ) {
    // part cannot be 0 or less and there is no 0 part of f&f movie
    // as the data contains only f&f movies, the movies.length represents the last part
    // filtering through each movie
    filteredData = req.movies.filter((movie) => {
      return movie.part == part; // returns a list with one element containing the f&f movie part
    });
    // check if the user is asking any particular information about that part of the f&f movie
    if (info) {
      if (filteredData[0][info]) {
        res.statusCode = 200;
        res.write(JSON.stringify(filteredData[0][info]));
        res.end();
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
      //console.log(info);
      res.statusCode = 200;
      res.write(JSON.stringify(filteredData[0]));
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
