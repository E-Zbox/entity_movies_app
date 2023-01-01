// env
const {
    env: { BCRYPT_SALT, JWT_SECRET_KEY },
} = process;

const {
    createUser,
    hashPassword,
    comparePassword,
    generateToken,
    verifyToken,
} = require("../utils/models/user");

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
        let token = generateToken(payload, JWT_SECRET_KEY);

        return res.status(200).json({
            success: true,
            message: "User was successfully logged in",
            response: { token },
        });
    } catch (error) {
        next(error);
    }
};
