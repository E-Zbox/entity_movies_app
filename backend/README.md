# Entity Movies App Backend 💻

### Table of Contents

-   [Description](#description)
    -   [API Breakdown](#api-breakdown-using-index-file)
        -   [Index endpoint](#index-endpoint)
    -   [Code Structure Snippet](#code-structure-snippet)
        -   [Config](#config)
        -   [Controllers](#controllers)
        -   [Middlewares](#middlewares)
        -   [Models](#models)
        -   [Resolvers](#resolvers)
        -   [Routes](#routes)
        -   [Schema](#schema)
        -   [Utils](#utils)
    -   [Further Documentation (Postman)](#further-documentation-postman)
    -   [Author](#author)

## Description

This is an endpoint provision that utilizes [The Movie Database API](https://api.themoviedb.org/3) to get movies, tv series and their seasons and episodes solely based on **genre** property.

This backend infrastructure acts as a wrapper providing two REST API endpoints and Graphs that can be used to query the database.

**Note:**
_The two REST endpoints acts as an alternative for user registration and user login._

### API Breakdown using [index file](./src/index.js)

The first 30 lines handle necessary configurations

-   project dependencies
-   environment variables
-   connecting to MongoDb database
-   endpoints routings
-   middlewares (**authorization**)
-   error handling

that form the building block of the whole backend infrastructure

#### Index endpoint

Routing to **/api/v1**

This returns a JSON response indicating that the server is up and running. The JSON response has a message prompt telling the user to sign-up so as to continue using the Graph/API

#### Endpoint Not Found handler

Routing to any route **/api/v1/\*** that cannot be found returns an API NOT FOUND ERROR prompt. A JSON response is returned with a message explaining the error

## Code Structure Snippet

### _[Config](./src/config/)_

#### [Database](./src/config/database.js)

This provides a function that connects to a MongoDb URI with specific parameters

#### [Error](./src/config/errors.js)

This contains constants and functions that return common named errors

### _[Controllers](./src/controllers/)_

#### [Index](./src/controllers/index.js)

This returns:

-   the **main graphql controller** for all the Graphs returned in this backend service with the exception of the User registration and login Graphs

-   the **context variable** that is consumed by the user query resolver. This is a shared variable by all the GraphQL resolvers.

### _[Middlewares](./src/middlewares/)_

#### [Auth](./src/middlewares/auth.js)

This returns:

-   a middleware `checkIsLoggedIn` that verifies the token provided by the client side and rejects the request if there's any error or allows the request on validation.

### _[Models](./src/models)_

This folder contains the various mongoose schemas and models that are used to perform powerful database queries and aggregations and return existing document(s)

### _[Resolvers](./src/resolvers/)_

This contains the various resolvers that handle the defined schema types and root values and returns predictive results.

### _[Routes](./src/routes/)_

#### [Index](./src/routes/index.js)

This exports both the primary router for Graphs and User auth Rest API

### _[Schema](./src/schema/)_

This folder contains schema type definitions of the models defined in [models folder](./src/model) with extras so as to enable querying and getting related-nested graphs throughout the available Graphs.

### _[Utils](./src/utils)_

#### [Client](./src/utils/client/index.js)

This provides an axios instance with pre-defined configuation to access **TMDB API**

#### [Models](./src/utils/models/index.js)

This returns a set of ready to use functions for performing queries to the database acting as a form of isolation to make the backend service compact and structured in parts

## Further Documentation (Postman)

Follow this [link](https://doc.io.postman) for the Postman Documentation for this backend service

## Author

[Ononogbu Ebenezer](https://twitter.com/ceoCodes)
