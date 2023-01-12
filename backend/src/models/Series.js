const { model, Schema } = require("mongoose");
const { pictureSchema } = require("./Movie");

const creatorSchema = new Schema({
    name: { type: String, required: true },
    profile: { type: String, required: false },
});

const seriesSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    picture: {
        type: pictureSchema,
        required: true,
    },
    genre: {
        type: [String],
        required: true,
    },
    last_season: {
        type: Number,
        required: true,
    },
    tmdb_id: {
        type: String,
        required: true,
    },
    first_air_date: {
        type: String,
        required: true,
    },
    original_language: {
        type: String,
        required: true,
    },
    created_by: {
        type: [creatorSchema],
        required: true,
    },
});

module.exports = model("Series", seriesSchema);
