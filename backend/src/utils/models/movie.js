// model
const { Movie } = require("../../models");

exports.createMovie = async ({
    title,
    genre,
    picture,
    description,
    release_date,
    download_link,
}) => {
    let response = { data: {}, error: "", success: false };
    try {
        let data = await Movie.create({
            title,
            genre,
            picture,
            description,
            release_date,
            download_link: download_link || "",
        });
        response = { ...response, data, success: true };
    } catch (error) {
        response = { ...response, error: JSON.stringify(error) };
    } finally {
        if (!success) console.log(response);
        return response;
    }
};

exports.getMoviesByGenre = async (genre_id) => {
    /**
     * this returns movies that have `genre_id` in their genre array
     *
     * @params `genre_id`
     */
    let response = { data: [], error: "", success: false };
    try {
        let data = await Movie.aggregate([{ $match: { genre: genre_id } }]);
        response = { ...response, data, success: true };
    } catch (error) {
        response = { ...response, error: JSON.stringify(error) };
    } finally {
        return response;
    }
};

exports.getMoviesSortedByGenre = async () => {
    /**
     * this returns movies sorted by their TMDB id provided in the Movie schema
     */
    let response = { data: [], error: "", success: false };
    try {
        let data = await Movie.aggregate([
            {
                $group: {
                    _id: "$genre",
                    data: {
                        $addToSet: {
                            title: "$title",
                            overview: "$description",
                        },
                    },
                },
            },
        ]);
        response = { ...response, data, success: true };
    } catch (error) {
        response = { ...response, error: JSON.stringify(error) };
    } finally {
        return response;
    }
};

exports.getMovieById = async (_id) => {
    /**
     * returns a movie document or raises an error based on the `_id`
     *
     * @params
     * _id: movie _id
     */
    let response = { data: {}, error: "", success: false };
    try {
        let data = await Movie.findOne({ _id });
        response = { ...response, data, success: true };
    } catch (error) {
        response = { ...response, error: JSON.stringify(response) };
    } finally {
        return response;
    }
};
