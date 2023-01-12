// _dependencies_
const { graphqlHTTP } = require("express-graphql");
const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader");
const { loadSchemaSync } = require("@graphql-tools/load");
const { mergeResolvers, mergeTypeDefs } = require("@graphql-tools/merge");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { join } = require("path");
// models
const models = require("../models");
// resolvers
const episodeResolver = require("../resolvers/episodeResolver");
const genreResolver = require("../resolvers/genreResolver");
const movieResolver = require("../resolvers/movieResolver");
const seasonResolver = require("../resolvers/seasonResolver");
const seriesResolver = require("../resolvers/seriesResolver");
const resolvers = mergeResolvers([
    episodeResolver,
    genreResolver,
    movieResolver,
    seasonResolver,
    seriesResolver,
]);
// typeDefs
const episodeTypeDefs = loadSchemaSync(
    join(__dirname, "../schema/Episode.graphql"),
    { loaders: [new GraphQLFileLoader()] }
);
const genreTypeDefs = loadSchemaSync(
    join(__dirname, "../schema/Genre.graphql"),
    { loaders: [new GraphQLFileLoader()] }
);
const movieTypeDefs = loadSchemaSync(
    join(__dirname, "../schema/Movie.graphql"),
    { loaders: [new GraphQLFileLoader()] }
);
const seasonTypeDefs = loadSchemaSync(
    join(__dirname, "../schema/Season.graphql"),
    { loaders: [new GraphQLFileLoader()] }
);
const seriesTypeDefs = loadSchemaSync(
    join(__dirname, "../schema/Series.graphql"),
    { loaders: [new GraphQLFileLoader()] }
);
const typeDefs = mergeTypeDefs([
    episodeTypeDefs,
    genreTypeDefs,
    movieTypeDefs,
    seasonTypeDefs,
    seriesTypeDefs,
]);
// schema
const schema = makeExecutableSchema({ typeDefs, resolvers });
// utils
const modelsUtils = require("../utils/models");

exports.context = {
    models,
    utils: {
        ...modelsUtils,
    },
};

exports.GQLController = graphqlHTTP({
    context: this.context,
    graphiql: false,
    schema,
});
