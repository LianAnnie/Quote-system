import styled from "styled-components";
import {
    LoginButton,
    RegisterButton,
    LogoutButton,
    ResetButton,
} from "./component/StyleComponent";
import { Form, Field } from "react-final-form";
import { useEffect } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

const Container = styled.div`
    background-color: #fffae3;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Message = styled.div`
    font-size: 5px;
    text-align: right;
    margin: 10px;
    margin-right: 100px;
`;

const FormStyled = styled.form`
    background-color: #f1d9a7;
    border-radius: 20px;
    width: 500px;
    height: 300px;
    padding: 40px;
    padding-left: 70px;
    font-size: 24px;
`;

const LabelStyled = styled.label`
    margin: 15px;
`;

const InputStyled = styled.input`
    height: 30px;
`;

const Status = styled.div`
    font-size: 24px;
    text-align: right;
`;

const loginData = [
    {
        name: "username",
        labelTitle: "UserName",
        type: "text",
        placeholder: "Username",
        accountInformation: "123@456.com",
    },
    {
        name: "password",
        labelTitle: "Password",
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
    setUserId,
    signOut,
    setMessage,
    checkErrorMessage,
    message,
}) {
    const auth = getAuth();

    useEffect(() => {
        if (loginStatus !== 3) {
            return;
        }
        signOut();
    }, [loginStatus]);

    async function runFirebaseLogin(values) {
        console.log(values);
        if (loginStatus === 1) {
            setMessage("您已經登入了");
            return;
        }
        setLoginStatus(2);
        setMessage(`登入驗證中....`);
        signInWithEmailAndPassword(auth, values.username, values.password)
            .then(userCredential => {
                setMessage(`歡迎回來`);
                const user = userCredential.user;
                const uid = user.uid;
                setUserId(uid);
            })
            .then(() => {
                setLoginStatus(1);
            })
            .catch(error => {
                console.log(`here?`);
                setLoginStatus(0);
                const errorCode = error.code;
                checkErrorMessage(errorCode);
            });
    }

    function runFirebaseRegister(values) {
        createUserWithEmailAndPassword(auth, values.username, values.password)
            .then(userCredential => {
                setMessage(`歡迎加入`);
                const user = userCredential.user;
                console.log(user);
                const uid = user.uid;
                setUserId(uid);
                setLoginStatus(1);
            })
            .catch(error => {
                const errorCode = error.code;
                checkErrorMessage(errorCode);
                console.log(`here?`);
                setLoginStatus(0);
            });
    }

    const FormRender = ({
        handleSubmit,
        form,
        submitting,
        pristine,
        values,
    }) => (
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
                                {meta.error && meta.touched && (
                                    <span>{meta.error}</span>
                                )}
                            </div>
                            <Message>{e.accountInformation}</Message>
                        </>
                    )}
                </Field>
            ))}
            <div className="buttons">
                <LoginButton
                    type="submit"
                    disabled={submitting}
                    onClick={() => runFirebaseLogin(values)}
                />
                <RegisterButton
                    type="submit"
                    disabled={submitting}
                    onClick={() => runFirebaseRegister(values)}
                />
                <LogoutButton
                    type="button"
                    disabled={submitting}
                    onClick={() => signOut()}
                />
                <ResetButton
                    type="button"
                    onClick={form.reset}
                    disabled={submitting || pristine}
                />
            </div>
            <Status>{message}</Status>
        </FormStyled>
    );

    return (
        <Container>
            <Form
                onSubmit={runFirebaseLogin}
                validate={errorMassage}
                render={FormRender}
            />
        </Container>
    );
}

export default LogIn;
