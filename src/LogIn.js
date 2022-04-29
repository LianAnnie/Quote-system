import styled from "styled-components";
import { Form, Field } from "react-final-form";
import { useEffect, useState } from "react";
import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
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

const FormRender = ({ handleSubmit, form, submitting, pristine, values }) => (
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
                onClick={() => {
                    form.change("SignIn", "???");
                }}
            >
                SignIn
            </button>
            <button
                type="submit"
                disabled={submitting}
                onClick={() => {
                    form.change("Register");
                }}
            >
                Register
            </button>
            <button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
            >
                Reset
            </button>
        </div>
        <pre>{JSON.stringify(values, 0, 2)}</pre>
    </form>
);

function LogIn({ setLoginStatus, loginStatus, setUserId }) {
    const [message, setMessage] = useState("");
    const auth = getAuth();
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                const uid = user.uid;
                setUserId(uid);
                setLoginStatus(1);
                setMessage(`歡迎回來`);
            } else {
                setLoginStatus(0);
            }
        });
    }, []);

    useEffect(() => {
        if (loginStatus !== 3) {
            return;
        }
        runFirebaseSignOut();
    }, [loginStatus]);

    async function onSubmit(values) {
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
                setLoginStatus(0);
                const errorCode = error.code;
                checkErrorMessage(errorCode);
            });
    }

    function checkErrorMessage(msg) {
        console.log(msg);
        const errorInformation = {
            "auth/too-many-requests": "嘗試次數過多",
            "auth/email-already-in-use": "此帳號已註冊",
            "auth/wrong-password": "密碼錯誤",
            "auth/weak-password": "請設置至少6位數密碼",
            "auth/invalid-email": "無效mail",
            "auth/requires-recent-login": "登入資料過期,請重新登入",
            "auth/internal-error": "內部系統資料錯誤,工程師搶修中",
            "auth/user-not-found": "此帳號尚未註冊",
        };
        if (errorInformation[msg]) {
            setMessage(errorInformation[msg]);
            return;
        }
        setMessage(`${msg}請聯繫客服確認問題解決方法`);
    }

    function runFirebaseSignOut() {
        signOut(auth)
            .then(() => {
                setMessage(`您已登出`);
                setUserId("");
                setLoginStatus(0);
            })
            .catch(error => {
                const errorCode = error.code;
                checkErrorMessage(errorCode);
            });
    }

    // function runFirebaseRegister() {
    //     createUserWithEmailAndPassword(auth, mail, password)
    //         .then(userCredential => {
    //             setMessage(`歡迎加入`);
    //             const user = userCredential.user;
    //             console.log(user);
    //             const uid = user.uid;
    //             setUserId(uid);
    //             setLoginStatus(1);
    //         })
    //         .catch(error => {
    //             const errorCode = error.code;
    //             checkErrorMessage(errorCode);
    //             setLoginStatus(0);
    //         });
    // }

    return (
        <Container>
            <div>
                <Form
                    onSubmit={onSubmit}
                    validate={errorMassage}
                    render={FormRender}
                />

                {/* <form>
              <div>
                <div>User</div>
                <input type="text"></input>
              </div>
              <div>
                <div>PassWord</div>
                <input type="text"></input>
              </div>
          </form> */}
            </div>
        </Container>
    );
}

export default LogIn;
