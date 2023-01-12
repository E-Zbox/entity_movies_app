const { model, Schema } = require("mongoose");

const episodeSchema = new Schema({
    count: { type: Number, required: true },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    picture: {
        type: String,
        required: true,
    },
    season_id: {
        type: String,
        required: true,
    },
    series_id: {
        type: String,
        required: true,
    },
    tmdb_id: {
        type: String,
        required: true,
    },
    air_date: {
        type: String,
        required: true,
    },
});

module.exports = model("Episode", episodeSchema);
