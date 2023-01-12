const { Series } = require("../../models");

exports.createSeries = async ({
    title,
    picture,
    description,
    genre,
    last_season,
    tmdb_id,
    first_air_date,
    original_language,
    created_by,
}) => {
    let response = { data: {}, error: "", success: false };
    try {
        let data = await Series.create({
            title,
            picture,
            description,
            genre,
            last_season,
            tmdb_id,
            first_air_date,
            original_language,
            created_by,
        });
        response = { ...response, data, success: true };
    } catch (error) {
        response = {
            ...response,
            error: JSON.stringify(error),
            success: false,
        };
    } finally {
        if (response.error) {
            console.log(response);
        }
        return response;
    }
};

exports.getSeriesSortedByGenre = async () => {
    let response = { data: [], error: "", success: false };
    try {
        let data = await Series.aggregate([
            { $unwind: "$genre" },
            {
                $group: {
                    _id: "$genre",
                    series: {
                        $addToSet: {
                            title: "$title",
                            description: "$description",
                            picture: "$picture",
                            genre: "$genre",
                            last_season: "$last_season",
                            tmdb_id: "$tmdb_id",
                            first_air_date: "$first_air_date",
                            original_language: "$original_language",
                            created_by: "$created_by",
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

exports.getSeriesByGenre = async (genre_id) => {
    let response = { data: {}, error: "", success: false };
    try {
        let data = await Series.aggregate([{ $match: { genre: genre_id } }]);
        response = { ...response, data, success: true };
    } catch (error) {
        response = { ...response, error: JSON.stringify(error) };
    } finally {
        return response;
    }
};

exports.getSingleSeries = async (_id) => {
    let response = { data: {}, error: "", success: false };
    try {
        let data = await Series.findOne({ _id });
        response = { ...response, data, success: true };
    } catch (error) {
        response = { ...response, error: JSON.stringify(error) };
    } finally {
        return response;
    }
};
