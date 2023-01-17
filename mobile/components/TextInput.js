// react
import React, { useRef } from "react";
import { Animated, Easing } from "react-native";
// styles
import { Input, InputContainer, Placeholder } from "../styles/shared/TextInput";

const TextInput = ({ placeholder, onChangeTextHandler, focusCondition }) => {
    const value = useRef(new Animated.Value(0));

    const translateUpAnimation = () => {
        const animation = Animated.timing(value.current, {
            toValue: 1,
            duration: 500,
            easing: Easing.inOut(Easing.exp),
            useNativeDriver: true,
        });
        animation.start();
    };

    const translateDownAnimation = () => {
        const animation = Animated.timing(value.current, {
            toValue: 0,
            duration: 750,
            easing: Easing.inOut(Easing.exp),
            useNativeDriver: true,
        });
        animation.start();
    };

    const onBlurHandler = () => {
        console.log("I got blurred!");
        if (focusCondition) translateDownAnimation();
    };

    const onFocusHandler = () => {
        console.log("Osheyyyy");
        if (focusCondition) {
            translateUpAnimation();
        }
    };

    return (
        <InputContainer>
            <Input
                onBlur={onBlurHandler}
                onFocus={onFocusHandler}
                onChangeText={onChangeTextHandler}
            />
            <Placeholder
                style={{
                    opacity: value.current.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.45, 1],
                    }),
                    transform: [
                        {
                            translateY: value.current.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, -40],
                            }),
                        },
                        {
                            scaleY: value.current.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 0.7],
                            }),
                        },
                    ],
                }}
            >
                {placeholder}
            </Placeholder>
        </InputContainer>
    );
};

export default TextInput;
