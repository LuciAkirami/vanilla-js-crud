// Your JSON data
const jsonData = require("./data/fastandfurious.json");

// // Find the index of the movie with "part" equal to "5"
const indexToRemove = jsonData.findIndex((movie) => {
  return movie.part == 5;
});

// // Check if the movie was found before attempting to remove it
// if (indexToRemove !== -1) {
//   // Use splice to remove the movie from the "movies" array
//   jsonData.movies.splice(indexToRemove, 1);
// }

// Now, jsonData.movies will not contain the movie with "part" equal to "5"
jsonData.splice(indexToRemove, 1);
console.log(jsonData);
