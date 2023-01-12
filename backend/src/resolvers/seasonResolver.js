module.exports = {
    // default root values
    Season: {
        episodes: async (parent, args, context) => {
            const { _id: season_id } = parent;
            const {
                utils: { getEpisodesBySeason },
            } = context;

            const { data, success, error } = await getEpisodesBySeason(
                String(season_id)
            );

            if (!success) throw new Error(error);

            return data;
        },
    },
    // generic queries
    Query: {
        async getSeason(parent, args, context) {
            const {
                input: { _id },
            } = args;
            const {
                utils: { getSeason },
            } = context;

            return await getSeason(_id);
        },
    },
};
