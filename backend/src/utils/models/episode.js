const { Episode } = require("../../models");

exports.createEpisode = async ({
    count,
    title,
    description,
    picture,
    season_id,
    series_id,
    tmdb_id,
    air_date,
}) => {
    let response = { data: {}, error: "", success: false };
    try {
        let data = await Episode.create({
            count,
            title,
            description,
            picture,
            season_id,
            series_id,
            tmdb_id,
            air_date,
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

exports.getEpisodesBySeason = async (season_id) => {
    let response = { data: [], error: "", success: false };
    try {
        let data = await Episode.aggregate([{ $match: { season_id } }]);
        response = { ...response, data, success: true };
    } catch (error) {
        response = { ...response, error: JSON.stringify(error) };
    } finally {
        return response;
    }
};

exports.getEpisode = async(_id)=> {
    let response = {data: [], error: "", success: false}
    try {
        let data = await Episode.findOne({_id})
        response = {...response, data, success: true}
    } catch(error) {
        response = {...response, error: JSON.stringify(error)}
    } finally {
        return response
    }
}