// expo
import Constants from "expo-constants";
// styled
import styled from "styled-components/native";

export const AppContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-top: ${Constants.statusBarHeight}px;
    // border: 3px solid green;
`;
