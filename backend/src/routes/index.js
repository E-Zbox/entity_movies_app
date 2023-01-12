const Router = require("express").Router();
// controller
const { GQLController } = require("../controllers");

Router.get("", GQLController);

module.exports = {
    GQLRoutes: Router,
    userRoutes: require("./userRoutes"),
};
