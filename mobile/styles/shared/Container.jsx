//expo
import Constants from "expo-constants";
// styled
import styled from "styled-components/native";

export const AvoidStatusBarContainer = styled.View`
    margin-top: ${Constants.statusBarHeight}px;
    background-color: ${({ bgColor }) => bgColor};
`;

export const RowContainer = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: ${({ alignItems }) => alignItems || "flex-start"};
    justify-content: ${({ justifyContent }) => justifyContent || "flex-start"};
`;
