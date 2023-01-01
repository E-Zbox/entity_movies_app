const { join } = require("path");
const express = require("express");

// .env
require("dotenv").config({
    path: join(__dirname, `.env.${process.env.NODE_ENV}`),
});
const {
    env: { MONGODB_URI, PORT },
} = process;

// config
const { connectToDb } = require("./config/database");
const { API_ENDPOINT_NOT_FOUND_ERR } = require("./config/errors");

// routes
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const baseURL = "/api/v1";

app.get(baseURL, (req, res) => {
    res.status(200).json({ success: true });
});

app.use(`${baseURL}/auth`, userRoutes);

app.use("*", (req, res, next) => {
    const error = {
        status: 404,
        message: API_ENDPOINT_NOT_FOUND_ERR,
    };
    next(error);
});

app.use((err, req, res, next) => {
    console.log("omo I caught the error sha :)");
    console.log(err);
    console.log("amaziiinnnng");
    const status = err.status || 500;
    const message = err.message || SERVER_ERR;
    const data = err.data || null;

    return res.status(status).json({ type: "error", message, data });
});

app.listen(PORT, () => {
    connectToDb(MONGODB_URI);
    console.log(`Server is listening on PORT ${PORT}`);
});
