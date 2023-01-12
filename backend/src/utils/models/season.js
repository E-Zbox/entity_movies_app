const { Season } = require("../../models");

exports.createSeason = async ({
    title,
    description,
    picture,
    count,
    last_episode,
    series_id,
}) => {
    let response = { data: {}, error: "", success: false };
    try {
        let data = await Season.create({
            title,
            description,
            picture,
            count,
            last_episode,
            series_id,
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

exports.getSeasonsBySeries = async (series_id) => {
    let response = { data: [], error: "", success: false };
    try {
        let data = await Season.aggregate([{ $match: { series_id } }]);
        response = { ...response, data, success: true };
    } catch (error) {
        response = { ...response, error: JSON.stringify(error) };
    } finally {
        // console.log(response);
        return response;
    }
};

exports.getSeason = async (_id) => {
    let response = { data: {}, error: "", success: false };
    try {
        let data = await Season.findOne({ _id });
        response = { ...response, data, success: true };
    } catch (error) {
        response = { ...response, error: JSON.stringify(error) };
    } finally {
        return response;
    }
};
