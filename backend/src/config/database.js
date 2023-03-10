const mongoose = require("mongoose");

exports.connectToDb = (dbURI) => {
    mongoose.set("strictQuery", true);
    mongoose
        .connect(dbURI, {
            dbName: "entity_movies",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((res) => {
            console.log("connected to database");
        })
        .catch((err) => {
            console.log(err);
            process.exit(1);
        });
};
