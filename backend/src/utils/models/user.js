const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// errors
const {
    USER_EMAIL_PASSWORD_ERR,
    USER_NOT_FOUND_ERR,
} = require("../../config/errors");
// model
const { User } = require("../../models");

exports.checkForUser = async (_email) => {
    let _user = await User.findOne({ _email });
    return _user;
};

exports.createUser = async (_email, _password, _username) => {
    let userExist = await this.checkForUser(_email);
    let response = { success: true, error: "", data: {} };

    if (userExist) {
        response = {
            success: false,
            error: `User with ${_email} email exists`,
            data: {},
        };
        return response;
    }

    try {
        let newUser = await User.create({
            email: _email,
            password: _password,
            username: _username,
        });
        response = { success: true, error: "", data: newUser };
    } catch (error) {
        response = { success: false, error: JSON.stringify(error), data: {} };
    } finally {
        return response;
    }
};

exports.comparePassword = async (_email, _password) => {
    let userExist = await this.checkForUser(_email);
    let response = {
        success: false,
        error: "",
        data: { bool: false, user: userExist },
    };

    if (!userExist) {
        response.error = USER_NOT_FOUND_ERR(_email);
        return response;
    }

    let { password: hashedPassword } = userExist;

    let bool = await bcrypt.compare(_password, hashedPassword);

    response = { success: true, error: "", data: { bool, user: userExist } };

    if (!bool) {
        response.error = USER_EMAIL_PASSWORD_ERR;
        return response;
    }

    response.error = "";
    return response;
};

exports.hashPassword = async (_password, salt) => {
    return await bcrypt.hash(_password, salt);
};

exports.generateToken = (payload, secretKey) => {
    let token = jwt.sign(payload, secretKey, {
        expiresIn: "2min",
    });
    return token;
};

exports.verifyToken = (token, secretKey) => {
    let decodedPayload = jwt.verify(token, secretKey);
    return decodedPayload;
};
