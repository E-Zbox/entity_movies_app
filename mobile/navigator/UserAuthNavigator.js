// components
import Header from "../components/Header";
// navigator
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// react
import React from "react";
// screen
import Login from "../screens/UserAuth/Login";
import Register from "../screens/UserAuth/Register";
// styles
import { HeaderContainer } from "../styles/UserAuth";
import { RowContainer } from "../styles/shared/Container";
// theme
import { useTheme } from "styled-components/native";
// utils
import { data } from "../utils/data";

const Stack = createNativeStackNavigator();

const UserAuthNavigator = ({ navigation }) => {
    const {
        screens: { userAuth },
    } = data;

    const {
        colors: { black01 },
    } = useTheme();

    return (
        <>
            <HeaderContainer bgColor={black01}>
                <RowContainer justifyContent={"center"}>
                    <Header imageUrl={userAuth.images.header} />
                </RowContainer>
            </HeaderContainer>
            <Stack.Navigator
                initialRouteName="Register"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
        </>
    );
};

export default UserAuthNavigator;
