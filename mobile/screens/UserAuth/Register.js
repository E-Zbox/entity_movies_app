// component
import TextInput from "../../components/TextInput";
// hooks
import useForm from "../../hooks/useForm";
// styles
import {
    Container,
    Content,
    ContentForm,
    Contents,
    ContentTitle,
    MainContainer,
} from "../../styles/UserAuth";

const Register = () => {
    const [formState, setFormState] = useForm({
        email: "",
        passwordOne: "",
        passwordTwo: "",
        username: "",
    });

    const onChangeTextHandler = (name, value) =>
        setFormState({ target: { name, value } });

    const emailFocusCondition = true;
    const passwordOneFocusCondition = true;
    const passwordTwoFocusCondition = true;
    const usernameFocusCondition = true;

    console.log("Register Screen");

    return (
        <MainContainer>
            <Container>
                <Contents>
                    <Content>
                        <ContentTitle>Register</ContentTitle>
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
                                focusCondition={passwordOneFocusCondition}
                                onChangeTextHandler={(value) =>
                                    onChangeTextHandler("passwordOne", value)
                                }
                            />
                            <TextInput
                                placeholder={"Confirm Password"}
                                focusCondition={passwordTwoFocusCondition}
                                onChangeTextHandler={(value) =>
                                    onChangeTextHandler("passwordTwo", value)
                                }
                            />
                            <TextInput
                                placeholder={"Username"}
                                focusCondition={usernameFocusCondition}
                                onChangeTextHandler={(value) =>
                                    onChangeTextHandler("username", value)
                                }
                            />
                        </ContentForm>
                    </Content>
                </Contents>
            </Container>
        </MainContainer>
    );
};

export default Register;
