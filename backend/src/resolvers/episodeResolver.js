module.exports = {
    // default root values
    Episode: {
        async season(parent, args, context) {
            const { season_id } = parent;
            const {
                utils: { getSeason },
            } = context;

            const { data, error, success } = await getSeason(season_id);

            if (!success) {
                throw new Error(error);
            }

            return data;
        },
    },
    // generic queries
    Query: {
        async getEpisode(parent, args, context) {
            const {
                input: { _id },
            } = args;
            const {
                utils: { getEpisode },
            } = context;

            return await getEpisode(_id);
        },
        async getEpisodesBySeason(parent, args, context) {
            const {
                input: { _id },
            } = args;
            const {
                utils: { getEpisodesBySeason },
            } = context;

            return await getEpisodesBySeason(_id);
        },
    },
};
