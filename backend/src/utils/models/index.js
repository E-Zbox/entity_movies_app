const episode = require("./episode");
const genre = require("./genre");
const movie = require("./movie");
const season = require("./season");
const series = require("./series");
const user = require("./user");

module.exports = {
    ...episode,
    ...genre,
    ...movie,
    ...season,
    ...series,
    ...user,
};
