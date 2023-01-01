module.exports = {
    API_ENDPOINT_NOT_FOUND_ERR: "Endpoint provided was not found",
    GENRE_NOT_FOUND_ERR: (name) => `Genre '${name}' not found`,
    USER_NOT_FOUND_ERR: (email) =>
        `User with provided credentials '${email}' was not found`,
    USER_EMAIL_PASSWORD_ERR: "Email, password does not match",
    SERVER_ERR: "Something went wrong",
};
