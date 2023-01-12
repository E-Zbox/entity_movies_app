const { model, Schema } = require("mongoose");

const seasonSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: { type: String, required: false },
    picture: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
    last_episode: {
        type: Number,
        required: true,
    },
    series_id: {
        type: String,
        required: true,
    },
});

module.exports = model("Season", seasonSchema);
