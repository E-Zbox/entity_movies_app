const Router = require("express").Router();

// controllers
const {
    createUserController,
    loginUserController,
} = require("../controllers/userController");

Router.post("/sign-up", createUserController);
Router.post("/sign-in", loginUserController);

module.exports = Router;
