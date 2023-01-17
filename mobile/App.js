// asyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";
// expo
import {
    useFonts,
    Roboto_300Light,
    Roboto_900Black,
} from "@expo-google-fonts/roboto";
import { StatusBar } from "expo-status-bar";
// navigator
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// react
import React from "react";
import { Alert, Text, TextInput, View } from "react-native";
// routes
import UserAuthNavigator from "./navigator/UserAuthNavigator";
// screens
// styled
import { ThemeProvider } from "styled-components/native";
// styles
import { AppContainer } from "./styles/App";
import { MainContainer } from "./styles/shared/Container";
// utils
import { theme } from "./utils/data";

const Stack = createNativeStackNavigator();

const App = () => {
    const [fontsLoaded] = useFonts({ Roboto_300Light, Roboto_900Black });

    return (
        <ThemeProvider theme={theme}>
            {fontsLoaded ? (
                <NavigationContainer
                // onLayout={() => {Alert.alert("onLayout Prop on Image Called....");}}
                >
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen
                            name="UserAuthNavigator"
                            component={UserAuthNavigator}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            ) : (
                <AppContainer>
                    <Text style={{ fontSize: 32, color: "#66ccee" }}>
                        Loading...
                    </Text>
                </AppContainer>
            )}
            <StatusBar />
        </ThemeProvider>
    );
};

export default App;
