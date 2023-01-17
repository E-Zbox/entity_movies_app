// react
import { Animated } from "react-native";
// styled
import styled from "styled-components/native";

export const InputContainer = styled.View`
    height: 70px;
    position: relative;
    align-items: flex-start;
    justify-content: flex-end;
    border: 1px solid blue;
`;
export const Input = styled.TextInput`
    width: 100%;
    height: 40px;
    border: 1px solid red;
`;
export const Placeholder = styled(Animated.Text)`
    position: absolute;
    bottom: 5px;
    font-size: 20px;
    font-weight: 100;
    font-family: "Roboto_300Light";
`;
