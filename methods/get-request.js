module.exports = (req, res) => {
  if (req.url === "/api/movies") {
    // status code 200 => OK
    res.statusCode = 200;
    // setting content type for the HTTP Header to json
    res.setHeader("Content-Type", "application/json");
    // passing in a message to the browser
    res.write(JSON.stringify(req.movies));
    // .end() implies nothing more will be written and its the end
    res.end();
  } else {
    // 404 Error when URL not found
    res.statusCode = 404;
    res.write(
      JSON.stringify({ title: "Not Found", message: "Route Not Found" })
    );
    // another way of sending response
    //res.writeHead(404, { "Content-Type": "application/json" });
    res.end();
  }
};
