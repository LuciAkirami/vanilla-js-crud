const fs = require("fs");
const path = require("path");

module.exports = (data) => {
  try {
    fs.writeFileSync(
      // path, where to write , i.e ../data/fastandfurious.json
      // __dirname gives current directory
      path.join(__dirname, "..", "data", "fastandfurious.json"),
      JSON.stringify(data),
      "utf-8"
    );
  } catch (err) {
    console.log(err);
  }
};
