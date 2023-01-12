module.exports = {
    // default root values
    Genre: {
        async movies(parent, args, context) {
            const { tmdb_id } = parent;
            const {
                utils: { getMoviesByGenre },
            } = context;

            let response = await getMoviesByGenre(tmdb_id);
            return response;
        },
        async series(parent, args, context) {
            const { tmdb_id: genre_id } = parent;
            const {
                utils: { getSeriesByGenre },
            } = context;

            const response = await getSeriesByGenre(genre_id);
            return response;
        },
    },
    // generic queries
    Query: {
        async getGenre(parent, args, context) {
            let {
                input: { _id: tmdb_id },
            } = args;
            let {
                utils: { getGenre },
            } = context;

            let response = await getGenre("", tmdb_id);
            return response;
        },
        async getGenres(parent, args, context) {
            let {
                utils: { getGenres },
            } = context;

            let response = await getGenres();
            return response;
        },
    },
};
