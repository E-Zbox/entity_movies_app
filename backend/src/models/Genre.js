const { model, Schema } = require("mongoose");

const genreSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    tmdb_id: {
        type: String,
        required: true,
        unique: true,
    },
});

module.exports = model("Genre", genreSchema);
