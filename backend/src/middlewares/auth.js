// env
const {
    env: { JWT_SECRET_KEY },
} = process;
// utils
const { verifyToken } = require("../utils/models/user");

exports.checkIsLoggedIn = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            throw Error(
                "No authorization token was provided. Provide a signed-in token"
            );
        }

        let [_, token] = authorization.split(" ");

        verifyToken(token, JWT_SECRET_KEY);
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw Error(
                "You are currently logged out!. Go to sign-in page to continue"
            );
        }
        throw Error(error);
    }
};
