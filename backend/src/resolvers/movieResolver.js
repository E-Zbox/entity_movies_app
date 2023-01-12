module.exports = {
    // default root values
    Movie: {
        async genre(parent, args, context) {
            const { _id } = parent;
            const {
                utils: { getGenre, getMovieById },
            } = context;

            const {
                data: { genre },
            } = await getMovieById(_id);
            const response = genre.map(async (tmdb_id) => {
                let { data } = await getGenre("", tmdb_id);
                return data;
            });
            return response;
        },
    },
    // generic queries
    Query: {
        async getMovie(parent, args, context) {
            const {
                input: { _id },
            } = args;
            const {
                utils: { getMovieById },
            } = context;

            return await getMovieById(_id);
        },
        async getMoviesByGenre(parent, args, context) {
            const {
                input: { _id: genre_id },
            } = args;
            const {
                utils: { getMoviesByGenre },
            } = context;

            const response = await getMoviesByGenre(genre_id);
            return response;
        },
    },
};
