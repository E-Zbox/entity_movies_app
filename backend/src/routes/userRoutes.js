const Router = require("express").Router();

// controllers
const {
    createUserController,
    loginUserController,
    userGQLController,
} = require("../controllers/userController");

Router.post("/auth/sign-up", createUserController)
    .post("/auth/sign-in", loginUserController)
    .post("/graphql/auth/user", userGQLController);

module.exports = Router;
