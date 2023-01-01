const { model, Schema } = require("mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    logged_in_token: {
        type: String,
        default: true,
    },
});

module.exports = model("User", userSchema);
