module.exports = {
    Query: {
        sayHi: (parent, args, context) => {
            const {
                data: { author },
            } = context;
            console.log(parent);
            return `Hello, ${author}`;
        },
    },
    Mutation: {
        signUpUser: (parent, args, context) => {
            let {
                input: { email, password },
            } = args;
            const {
                functions: { genreCreator },
            } = context;
            genreCreator();
            console.log(args);
            return { email, password, username: "maziEben" };
        },
    },
};
