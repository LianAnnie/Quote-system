import styled from "styled-components";
import { Form, Field } from "react-final-form";
import { useEffect } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

const Container = styled.div`
    text-align: left;
`;

const loginData = [
    {
        name: "username",
        labelTitle: "UserName",
        type: "text",
        placeholder: "Username",
    },
    {
        name: "password",
        labelTitle: "Password",
        type: "password",
        placeholder: "Password",
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
        <form onSubmit={handleSubmit}>
            {loginData.map(e => (
                <Field name={e.name} key={e.name}>
                    {({ input, meta }) => (
                        <div>
                            <label>{e.labelTitle}</label>
                            <input
                                {...input}
                                type={e.type}
                                placeholder={e.placeholder}
                            />
                            {meta.error && meta.touched && (
                                <span>{meta.error}</span>
                            )}
                        </div>
                    )}
                </Field>
            ))}
            <div className="buttons">
                <button
                    type="submit"
                    disabled={submitting}
                    onClick={() => runFirebaseLogin(values)}
                >
                    SignIn
                </button>
                <button
                    type="submit"
                    disabled={submitting}
                    onClick={() => runFirebaseRegister(values)}
                >
                    Register
                </button>
                <button
                    type="button"
                    disabled={submitting}
                    onClick={() => signOut()}
                >
                    Logout
                </button>
                <button
                    type="button"
                    onClick={form.reset}
                    disabled={submitting || pristine}
                >
                    Reset
                </button>
            </div>
            <pre>{message}</pre>
        </form>
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
