module.exports = {
    // default root values
    Series: {
        async seasons(parent, args, context) {
            const { _id } = parent;
            const {
                utils: { getSeasonsBySeries },
            } = context;

            const series_id = String(_id);

            const { data, error, success } = await getSeasonsBySeries(
                series_id
            );

            if (!success) {
                throw Error(error);
            }

            return data;
        },
    },
    // generic root values
    Query: {
        async getSingleSeries(parent, args, context) {
            const {
                input: { _id },
            } = args;
            const {
                utils: { getSingleSeries },
            } = context;

            return await getSingleSeries(_id);
        },
        async getSeriesByGenre(parent, args, context) {
            const {
                input: { _id: genre_id },
            } = args;
            const {
                utils: { getSeriesByGenre },
            } = context;

            return await getSeriesByGenre(genre_id);
        },
    },
};
