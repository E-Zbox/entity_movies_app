// axios instance
const instance = require("../client");
// utils
const {
    createEpisode,
    createGenre,
    createMovie,
    createSeason,
    createSeries,
} = require("../models");

exports.genreCreator = () => {
    instance
        .get("/genre/tv/list") // =>     /genre/movie/list
        .then((res) => res.data)
        .then((data) => {
            console.log(data);
            let { genres } = data;
            genres.forEach(
                async ({ id: tmdb_id, name: title }) =>
                    await createGenre(title, tmdb_id)
            );
        })
        .catch((err) => console.log(err));
};

exports.movieCreator = () =>
    //  the total number of pages is 1000. For the online database clone about 500+ pages of movie content
    instance
        .get("/trending/movie/week")
        .then((res) => res.data)
        .then(({ results }) => {
            console.log(results);
            results.forEach(
                async ({
                    title,
                    genre_ids: genre,
                    poster_path: thumbnail,
                    backdrop_path: large,
                    overview: description,
                    release_date,
                }) => {
                    let picture = {
                        thumbnail: `/w200${thumbnail}`,
                        large: `/w500${large}`,
                    };
                    // continue from here tomorrow
                    /**
                     * Today's date: (01/01/2023)
                     * create mongoose schema validation for movies model first before creating any movie
                     * note also, the TMDB_BASE_IMAGE_URL is not appended to thumbnail and large properties so as to improve server latency
                     * Continued : today's date (02/01/2023)
                     */
                    await createMovie({
                        title,
                        genre,
                        picture,
                        description,
                        release_date,
                    });
                }
            );
        })
        .catch((err) => console.log(err));

exports.paginatedSeriesCreator = () => {
    let page = 1;

    this.seriesCreator(page).then((total_pages) => {
        while (page <= total_pages) {
            console.log(`Done with page ${page}`);
            ++page;
            this.seriesCreator(page);
        }
    });
    console.log(total_pages);
};

exports.seriesCreator = (page = 1) =>
    instance
        .get("/trending/tv/week", { params: { page } })
        .then((res) => res.data)
        .then((data) => {
            const { results, total_pages } = data;
            results.forEach(
                async ({
                    name: title,
                    overview: description,
                    backdrop_path: large,
                    poster_path: thumbnail,
                    genre_ids: genre,
                    id: tmdb_id,
                    first_air_date,
                    original_language,
                }) => {
                    let picture = {
                        thumbnail: `/w200${thumbnail}`,
                        large: `/w500${large}`,
                    };

                    try {
                        // get series details
                        let {
                            created_by: _created_by,
                            last_episode_to_air: { season_number: last_season },
                            seasons,
                        } = await instance
                            .get(`/tv/${tmdb_id}`)
                            .then((res) => res.data);

                        let created_by = _created_by.map(
                            ({ name, profile_path }) => ({
                                name,
                                profile: `/w500${profile_path}`,
                            })
                        );

                        let payload = {
                            title,
                            picture,
                            description,
                            genre,
                            last_season,
                            tmdb_id,
                            first_air_date,
                            original_language,
                            created_by,
                        };

                        let {
                            data: { _id: series_id },
                            error,
                            success,
                        } = await createSeries(payload);

                        // loop through the available seasons and create season documents
                        if (!success) {
                            throw Error(error);
                        }
                        seasons.forEach(
                            ({
                                air_date,
                                episode_count: seasonLastEpisode,
                                season_number,
                                overview: seasonDescription,
                            }) =>
                                air_date !== null &&
                                this.seasonEpisodesCreator(
                                    tmdb_id,
                                    series_id,
                                    season_number,
                                    seasonDescription,
                                    seasonLastEpisode,
                                    thumbnail
                                )
                        );
                    } catch (error) {
                        console.log(error);
                    }
                }
            );
            return total_pages;
        })
        .catch((err) => console.log(err));

exports.seasonEpisodesCreator = (
    series_tmdb_id,
    series_id,
    season_number,
    seasonDescription,
    seasonLastEpisode,
    seriesPosterPath
) =>
    instance
        .get(`/tv/${series_tmdb_id}/season/${season_number}`)
        .then((res) => res.data)
        .then(
            async ({
                name: title,
                episodes,
                poster_path,
                season_number: count,
            }) => {
                let picture = `/w500${
                    poster_path ? poster_path : seriesPosterPath
                }`;
                let seasonPayload = {
                    title,
                    description: seasonDescription,
                    picture,
                    count,
                    last_episode: seasonLastEpisode,
                    series_id,
                };

                let {
                    data: { _id: season_id, picture: season_picture },
                    error,
                    success,
                } = await createSeason(seasonPayload);

                if (!success) {
                    throw Error(error);
                }

                episodes.forEach(
                    async ({
                        episode_number: count,
                        name: title,
                        overview: description,
                        still_path,
                        id: tmdb_id,
                        air_date,
                    }) => {
                        let picture = `/w500${
                            still_path ? still_path : season_picture
                        }`;

                        let episodePayload = {
                            count,
                            title,
                            description,
                            picture,
                            season_id,
                            series_id,
                            tmdb_id,
                            air_date,
                        };

                        await createEpisode(episodePayload);
                    }
                );
            }
        )
        .catch((err) => console.log(err));
