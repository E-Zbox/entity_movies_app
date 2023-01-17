// component
import TextInput from "../../components/TextInput";
// hooks
import useForm from "../../hooks/useForm";
// react
import { useEffect } from "react";
// styles
import {
    Container,
    Content,
    ContentForm,
    ContentTitle,
    Contents,
    MainContainer,
} from "../../styles/UserAuth";

const Login = ({ navigation }) => {
    const [formState, setFormState] = useForm({ email: "", password: "" });

    console.log("Login Screen");

    const onChangeTextHandler = (name, value) =>
        setFormState({ target: { name, value } });

    const emailFocusCondition = formState.email.length == 0;
    const passwordFocusCondition = formState.password.length == 0;

    useEffect(() => {
        console.log(formState);
    }, [formState]);

    return (
        <MainContainer>
            <Container>
                <Contents>
                    <Content>
                        <ContentTitle>Login</ContentTitle>
                        <ContentForm>
                            <TextInput
                                placeholder={"Email"}
                                focusCondition={emailFocusCondition}
                                onChangeTextHandler={(value) =>
                                    onChangeTextHandler("email", value)
                                }
                            />
                            <TextInput
                                placeholder={"Password"}
                                focusCondition={passwordFocusCondition}
                                onChangeTextHandler={(value) =>
                                    onChangeTextHandler("password", value)
                                }
                            />
                        </ContentForm>
                    </Content>
                </Contents>
            </Container>
        </MainContainer>
    );
};

export default Login;
