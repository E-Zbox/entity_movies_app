// axios
const instance = require("../client");
// utils
const { createGenre } = require("../models/genre");

exports.genreCreator = () => {
    console.log("calling genreCreator");
    instance
        .get("/genre/movie/list")
        .then((res) => {
            console.log(res);
            return res.data;
        })
        .then((data) => {
            console.log(data);
            let { genres } = data;
            genres.forEach(({ id: tmdb_id, name: title }) =>
                createGenre(title, tmdb_id)
            );
        })
        .catch((err) => console.log(err));
};
