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
// errors
const { API_ENDPOINT_NOT_FOUND_ERR, SERVER_ERR } = require("./config/errors");
// middleware
const { checkIsLoggedIn } = require("./middlewares/auth");
// ---- populate js ----
const { seriesCreator } = require("./utils/db/populate");
// routes
const { userRoutes, GQLRoutes } = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const baseURL = "/api/v1";

app.get(baseURL, (req, res) => {
    seriesCreator(4);
    return res.status(200).json({
        data: null,
        error: "",
        message:
            "Welcome. Head over to the documentation @ /head-over.com to get started 😂",
        success: true,
    });
});

app.use(`${baseURL}`, userRoutes);

// middleware
app.use(checkIsLoggedIn);

app.use(`${baseURL}/graphql`, GQLRoutes);

app.use("*", (req, res, next) => {
    const error = {
        status: 404,
        message: API_ENDPOINT_NOT_FOUND_ERR,
    };
    next(error);
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || SERVER_ERR;
    const data = err.data || null;

    return res.status(status).json({ type: "error", message, data });
});

app.listen(PORT, () => {
    connectToDb(MONGODB_URI);
    console.log(`Server is listening on PORT ${PORT}`);
});
