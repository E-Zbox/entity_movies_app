// errors
const { GENRE_NOT_FOUND_ERR } = require("../../config/errors");
// model
const { Genre } = require("../../models");

exports.createGenre = async (title, tmdb_id) => {
    let response = { data: {}, error: "", success: false };
    try {
        let data = await Genre.create({ title, tmdb_id });
        response = { ...response, data, success: true };
    } catch (error) {
        response = {
            ...response,
            error: JSON.stringify(error),
            success: false,
        };
    } finally {
        console.log(response);
        return response;
    }
};

exports.getGenres = async () => {
    let response = { data: [], error: "", success: false };
    try {
        let data = await Genre.find({});
        response = { ...response, data, success: true };
    } catch (error) {
        response = {
            ...response,
            error: JSON.stringify(error),
            success: false,
        };
    } finally {
        console.log(response);
        return response;
    }
};

exports.getGenre = async (title = "", tmdb_id = "") => {
    let response = { data: {}, error: "", success: false };
    try {
        let data = await Genre.findOne({ title, tmdb_id });
        response = { ...response, data, success: true };
    } catch (error) {
        response = {
            ...response,
            error: JSON.stringify(error),
            success: false,
        };
    } finally {
        console.log(response);
        return response;
    }
};
