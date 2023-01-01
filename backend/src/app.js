const { readFileSync } = require("fs");
const { join } = require("path");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");

// genreCreator
const { genreCreator } = require("./utils/db/populate");

// config
require("dotenv").config({
    path: join(__dirname, `.env.${process.env.NODE_ENV}`),
});

const {
    env: { PORT },
} = process;

const resolvers = require("./resolvers/index");

const typeDefs = readFileSync(join(__dirname, "./schema/index.graphql"), {
    encoding: "utf-8",
});

const context = { data: { author: "Mazi Eben" }, functions: { genreCreator } };
const graphiql = false;
const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();

app.get("/api/v1/graphql", graphqlHTTP({ context, graphiql, schema }));

app.post(
    "/api/v1/graphql/mutation",
    graphqlHTTP({ context, graphiql, schema })
);

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));
