const { model, Schema } = require("mongoose");

const pictureSchema = new Schema({
    thumbnail: {
        type: String,
        required: true,
    },
    large: {
        type: String,
        required: true,
    },
});

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    genre: {
        type: [String],
        required: true,
    },
    picture: {
        type: pictureSchema,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    release_date: {
        type: String,
        required: true,
    },
    download_link: {
        type: String,
    },
});

module.exports = { model: model("Movie", movieSchema), pictureSchema };
