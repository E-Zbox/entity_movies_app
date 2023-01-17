// expo
import Constants from "expo-constants";
// styled
import styled from "styled-components/native";

export const MainContainer = styled.KeyboardAvoidingView`
    flex: 1;
    width: 100%;
    align-items: center;
    justify-content: flex-end;
    margin-top: ${Constants.statusBarHeight}px;
    background-color: ${({
        theme: {
            colors: { black01 },
        },
    }) => black01};
    border: 1px solid red;
`;
export const Container = styled.View`
    flex: 0.9;
    width: 100%;
    align-items: center;
    justify-content: flex-end;
    border: 2px solid green;
`;
export const Contents = styled.View`
    flex: 0.85;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    background-color: transparent;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    overflow: hidden;
    background-color: ${({
        theme: {
            colors: { green011 },
        },
    }) => green011};
    border: 4px solid blue;
`;
export const ScrollContents = styled.ScrollView.attrs((props) => ({
    contentContainerStyle: {
        alignItems: "center",
        justifyContent: "flex-end",
    },
}))`
    flex: 0.85;
    width: 100%;
    background-color: transparent;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    overflow: hidden;
    background-color: ${({
        theme: {
            colors: { green011 },
        },
    }) => green011};
    border: 4px solid blue;
`;
export const Content = styled.SafeAreaView`
    flex: 1;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: ${({
        theme: {
            colors: { black012 },
        },
    }) => black012};
    border: 1px solid red;
`;
export const ContentTitle = styled.Text`
    color: ${({
        theme: {
            colors: { white01 },
        },
    }) => white01};
    text-align: center;
    font-size: 32px;
    font-weight: 400;
    font-family: "Roboto_900Black";
`;
export const ContentForm = styled.SafeAreaView`
    width: 100%;
    min-height: 500px;
    padding-horizontal: 10px;
    border: 1px solid red;
`;

export const HeaderContainer = styled.SafeAreaView`
    background-color: ${({
        theme: {
            colors: { black01 },
        },
    }) => black01};
    position: absolute;
    top: 60px;
    left: 0px;
    width: 100%;
    z-index: 2;
`;
