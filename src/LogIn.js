/* eslint-disable react/prop-types */
import styled from "styled-components";
import { Form, Field } from "react-final-form";
import { useEffect } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Button } from "./component/StyleComponent";

const Container = styled.div`
    background-color: #fffae3;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MainContainer = styled.div`
    background-color: #fffae3;
    justify-content: center;
`;
const MainHeader = styled.div`
    background-color: #c4d6b0;
    height: 72px;
    width: 144px;
    margin: auto;
    border-top-right-radius: 71px;
    border-top-left-radius: 71px;
`;

const LogoImg = styled.img`
    height: 125px;
    margin: 10px 9px;
`;

const MainBody = styled.div`
    background-color: #c4d6b0;
    width: 360px;
    height: 600px;
    padding-top: 80px;
    border-radius: 40px;
`;

const FormStyled = styled.form`
    margin: auto;
    background-color: #c4d6b0;
    border-radius: 20px;
    width: 300px;
    height: 220px;
    font-size: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    letter-spacing: 10px;
`;
const LabelStyled = styled.label`
    height: 40px;
    margin: 15px;
`;

const InputStyled = styled.input`
    margin-top: 5px;
    width: 100%;
    height: 52px;
    border-radius: 10px;
    border: 1px solid #c4d6b0;
    text-align: center;
    letter-spacing: 1px;
    front-size: 16px;
`;

const LogInAndRegisterButton = styled(Button)`
    margin: 10px;
    width: 130px;
    height: 55px;
    margin: 30px;
    padding: 8px;
`;

const MessageContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Message = styled.div`
    font-size: 15px;
    text-align: right;
    margin-top: 5px;
    margin-bottom: 20px;
    letter-spacing: 0;
`;

const ErrorMessage = styled.div`
    font-size: 15px;
    text-align: right;
    margin-top: 5px;
    letter-spacing: 0;
    color: red;
`;

const Status = styled.div`
    font-size: 24px;
    text-align: right;
`;

const loginData = [
    {
        name: "username",
        labelTitle: "帳號",
        type: "text",
        placeholder: "Username",
        accountInformation: "123@456.com",
    },
    {
        name: "password",
        labelTitle: "密碼",
        type: "password",
        placeholder: "Password",
        accountInformation: "123456",
    },
];

function errorMassage(values) {
    const errors = {};
    if (!values.username) {
        errors.username = "Required";
    }
    if (!values.password) {
        errors.password = "Required";
    }
    if (!values.confirm) {
        errors.confirm = "Required";
    } else if (values.confirm !== values.password) {
        errors.confirm = "Must match";
    }
    return errors;
}

function LogIn({
    setLoginStatus,
    loginStatus,
    signOut,
    setMessage,
    checkErrorMessage,
    message,
}) {
    const auth = getAuth();
    let navigate = useNavigate();
    let location = useLocation();

    let from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (loginStatus === 1) {
            navigate(from, { replace: true });
        }
        if (loginStatus !== 3) {
            return;
        }
        signOut();
    }, [loginStatus]);

    async function runFirebaseLogin(values) {
        if (loginStatus === 1) {
            setMessage("您已經登入了");
            return;
        }
        setLoginStatus(2);
        setMessage(`登入驗證中....`);
        signInWithEmailAndPassword(auth, values.username, values.password)
            .then(() => {
                setMessage(`歡迎回來`);
            })
            .then(() => {
                setLoginStatus(1);
            })
            .then(() => {
                navigate(from, { replace: true });
            })
            .catch(error => {
                setLoginStatus(0);
                const errorCode = error.code;
                checkErrorMessage(errorCode);
            });
    }

    function runFirebaseRegister(values) {
        createUserWithEmailAndPassword(auth, values.username, values.password)
            .then(() => {
                setMessage(`歡迎加入`);
                setLoginStatus(1);
            })
            .catch(error => {
                const errorCode = error.code;
                checkErrorMessage(errorCode);
                setLoginStatus(0);
            });
    }

    const FormRender = ({ handleSubmit, submitting, values }) => (
        <FormStyled onSubmit={handleSubmit}>
            {loginData.map(e => (
                <Field name={e.name} key={e.name}>
                    {({ input, meta }) => (
                        <>
                            <div>
                                <LabelStyled>{e.labelTitle}</LabelStyled>
                                <InputStyled
                                    {...input}
                                    type={e.type}
                                    placeholder={e.placeholder}
                                />
                                <MessageContainer>
                                    <Message>{e.accountInformation}</Message>
                                    {meta.error && meta.touched && (
                                        <ErrorMessage>
                                            {meta.error}
                                        </ErrorMessage>
                                    )}
                                </MessageContainer>
                            </div>
                        </>
                    )}
                </Field>
            ))}
            <div className="buttons">
                <LogInAndRegisterButton
                    type="submit"
                    disabled={submitting}
                    onClick={() => runFirebaseLogin(values)}
                >
                    登入
                </LogInAndRegisterButton>
                <LogInAndRegisterButton
                    type="submit"
                    disabled={submitting}
                    onClick={() => runFirebaseRegister(values)}
                >
                    註冊
                </LogInAndRegisterButton>
            </div>
            <Status>{message}</Status>
        </FormStyled>
    );

    return (
        <Container>
            <MainContainer>
                <MainHeader>
                    <LogoImg src={require("./images/log.png")} alt="logo" />
                </MainHeader>
                <MainBody>
                    <Form
                        onSubmit={runFirebaseLogin}
                        validate={errorMassage}
                        render={FormRender}
                    />
                </MainBody>
            </MainContainer>
        </Container>
    );
}

LogIn.propTypes = {
    setLoginStatus: PropTypes.func.isRequired,
    loginStatus: PropTypes.number.isRequired,
    signOut: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired,
    checkErrorMessage: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
};

export default LogIn;
