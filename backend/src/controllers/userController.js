// context
const { context: _context } = require("./index");
// env
const {
    env: { BCRYPT_SALT, JWT_SECRET_KEY },
} = process;
// modular imports
const { graphqlHTTP } = require("express-graphql");
const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader");
const { loadSchemaSync } = require("@graphql-tools/load");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { join } = require("path");
// resolvers
const resolvers = require("../resolvers/userResolver");

const typeDefs = loadSchemaSync(join(__dirname, "../schema/User.graphql"), {
    loaders: [new GraphQLFileLoader()],
});
// schema
const schema = makeExecutableSchema({ typeDefs, resolvers });
// utils
const userUtils = require("../utils/models/user");

const context = {
    ..._context,
    env: { BCRYPT_SALT, JWT_SECRET_KEY },
    utils: { ...userUtils, ..._context.utils },
};

const {
    createUser,
    hashPassword,
    comparePassword,
    generateToken,
    verifyToken,
} = userUtils;

exports.userGQLController = graphqlHTTP((req, res, next) => ({
    context: { ...context, req, res, next },
    graphiql: false,
    schema,
}));

exports.createUserController = async (req, res, next) => {
    try {
        const { email, password, username } = req.body;

        let hashedPassword = await hashPassword(password, Number(BCRYPT_SALT));
        let response = await createUser(email, hashedPassword, username);

        if (response.error) {
            throw new Error(response.error);
        }

        return res.status(201).json({
            ...response,
            success: true,
            message: "Created User successfully!",
        });
    } catch (error) {
        next(error);
    }
};

exports.loginUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        let {
            data: { bool, user },
            error,
            success,
        } = await comparePassword(email, password);

        /** check if an error occurs while comparing password
         * error can be USER_NOT_FOUND, etc
         */
        if (error && !success) {
            throw new Error(error);
        }

        // if password does not match
        if (!bool && success) {
            throw new Error(error);
        }

        let payload = {
            _id: user._id,
            email: user.email,
            password: user.password,
        };

        let token =
            user.logged_in_token || generateToken(payload, JWT_SECRET_KEY);

        // verifies token to check if token has expired
        try {
            verifyToken(token, JWT_SECRET_KEY);
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                token = generateToken(payload, JWT_SECRET_KEY);
            }
        }

        if (token !== user.logged_in_token) {
            let {
                models: { User },
            } = context;
            await User.updateOne(
                { email: user.email },
                { logged_in_token: token }
            );
        }

        return res.status(200).json({
            success: true,
            message: "User was successfully logged in",
            response: { token },
        });
    } catch (error) {
        next(error);
    }
};
