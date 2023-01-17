// react
import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const dimensions = { height, width };

export const theme = {
    colors: {
        black01: "#0A0A0A",
        black011: "rgba(10, 10, 10, 0.5)",
        black012: "rgba(10, 10, 10, 0.25)", // #0A0A0Axx opacity values that I can't represent in hex
        green01: "#00DAC0",
        green011: "#00DAC094",
        white01: "#FDFDFD",
    },
    dimensions,
};

export const data = {
    dimensions,
    screens: {
        userAuth: {
            images: {
                header: require("../assets/images/logo-transparent-bg.png"),
            },
        },
    },
};
