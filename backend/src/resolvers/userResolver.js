module.exports = {
    Mutation: {
        async signInUser(parent, args, context, info) {
            let {
                input: { email, password },
            } = args;
            let {
                env: { BCRYPT_SALT, JWT_SECRET_KEY },
                models: { User },
                utils: {
                    createUser,
                    hashPassword,
                    comparePassword,
                    generateToken,
                    verifyToken,
                },
                req,
                res,
                next,
            } = context;

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

            // checks user model if logged_in_token exists else, it generates a token for the user
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

            const response = {
                data: {
                    email: user.email,
                    username: user.username,
                    token,
                },
                error: "",
                success: true,
            };

            if (token !== user.logged_in_token) {
                await User.updateOne(
                    { email: user.email },
                    { logged_in_token: token }
                );
            }

            return response;
        },

        async signUpUser(parent, args, context) {
            let {
                input: { email: _email, password, username: _username },
            } = args;
            let {
                env: { BCRYPT_SALT, JWT_SECRET_KEY },
                utils: {
                    createUser,
                    hashPassword,
                    comparePassword,
                    generateToken,
                    verifyToken,
                },
            } = context;

            let hashedPassword = await hashPassword(
                password,
                Number(BCRYPT_SALT)
            );
            let {
                data: { email, username },
                error,
                success,
            } = await createUser(_email, hashedPassword, _username);

            let response = { data: { email, username }, error, success };

            return response;
        },
    },
    Query: {
        sayHi: (parent, args, context) => {
            return "Hey there, maziEben";
        },
    },
};
