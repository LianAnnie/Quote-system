import styled from "styled-components";
import "./App.css";
import LogIn from "./LogIn";
import BulletinBoard from "./BulletinBoard";
import Overview from "./Overview";
import Company from "./Company";
import Bom from "./Bom";
import Analysis from "./Analysis";
import Quote from "./Quote";
import Order from "./Order";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Container = styled.div`
    text-align: left;
`;

function App() {
    const [loginStatus, setLoginStatus] = useState(0);
    const [message, setMessage] = useState("");
    console.log(loginStatus);
    const [userId, setUserId] = useState("");
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                const uid = user.uid;
                setUserId(uid);
                setLoginStatus(1);
                setMessage(`歡迎回來`);
            } else {
                console.log(`here?`);
                setLoginStatus(0);
            }
        });
    }, []);

    function runFirebaseSignOut() {
        signOut(auth)
            .then(() => {
                setMessage(`您已登出`);
                setUserId("");
                console.log(`here?`);
                setLoginStatus(0);
            })
            .catch(error => {
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

    return (
        <Container>
            <Router>
                <Routes>
                    <Route
                        path="/login"
                        element={
                            loginStatus === 0 ? (
                                <LogIn
                                    loginStatus={loginStatus}
                                    setLoginStatus={setLoginStatus}
                                    setUserId={setUserId}
                                    signOut={runFirebaseSignOut}
                                    setMessage={setMessage}
                                    message={message}
                                    checkErrorMessage={checkErrorMessage}
                                />
                            ) : (
                                <Navigate replace to="/" />
                            )
                        }
                    />
                    <Route
                        path="/"
                        element={
                            loginStatus === 0 ? (
                                <Navigate replace to="/login" />
                            ) : (
                                <BulletinBoard signOut={runFirebaseSignOut} />
                            )
                        }
                    />
                    <Route
                        path="/overview"
                        element={
                            loginStatus === 0 ? (
                                <Navigate replace to="/login" />
                            ) : (
                                <Overview signOut={runFirebaseSignOut} />
                            )
                        }
                    />
                    <Route
                        path="/company"
                        element={
                            loginStatus === 0 ? (
                                <Navigate replace to="/login" />
                            ) : (
                                <Company signOut={runFirebaseSignOut} />
                            )
                        }
                    />
                    <Route
                        path="/bom"
                        element={
                            loginStatus === 0 ? (
                                <Navigate replace to="/login" />
                            ) : (
                                <Bom signOut={runFirebaseSignOut} />
                            )
                        }
                    />
                    <Route
                        path="/analysis"
                        element={
                            loginStatus === 0 ? (
                                <Navigate replace to="/login" />
                            ) : (
                                <Analysis signOut={runFirebaseSignOut} />
                            )
                        }
                    />
                    <Route
                        path="/quote"
                        element={
                            loginStatus === 0 ? (
                                <Navigate replace to="/login" />
                            ) : (
                                <Quote signOut={runFirebaseSignOut} />
                            )
                        }
                    />
                    <Route
                        path="/order"
                        element={
                            loginStatus === 0 ? (
                                <Navigate replace to="/login" />
                            ) : (
                                <Order signOut={runFirebaseSignOut} />
                            )
                        }
                    />
                    <Route path="/*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </Container>
    );
}

export default App;
