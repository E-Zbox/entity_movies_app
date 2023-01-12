const axios = require("axios");

const {
    env: { TMDB_API_KEY, TMDB_BASE_URL },
} = process;

const instance = axios.create({
    baseURL: TMDB_BASE_URL,
    timeout: 8000,
    params: { api_key: TMDB_API_KEY },
});

module.exports = instance;
