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
import SideBar from "./component/SideBar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useLocation,
} from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Container = styled.div`
    text-align: left;
`;

function RequireAuth({ children, loginStatus }) {
    console.log(`loginStatus`, loginStatus);
    let location = useLocation();
    if (loginStatus === 0) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

function App() {
    const [loginStatus, setLoginStatus] = useState(2);
    const [message, setMessage] = useState("");
    console.log(loginStatus);
    const [userId, setUserId] = useState("");
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                const uid = user.uid;
                console.log(uid);
                setUserId(uid);
                setLoginStatus(1);
                setMessage(`歡迎回來`);
            } else {
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
                            <LogIn
                                loginStatus={loginStatus}
                                setLoginStatus={setLoginStatus}
                                setUserId={setUserId}
                                signOut={runFirebaseSignOut}
                                setMessage={setMessage}
                                message={message}
                                checkErrorMessage={checkErrorMessage}
                            />
                        }
                    />
                    <Route element={<SideBar signOut={runFirebaseSignOut} />}>
                        <Route
                            path="/"
                            element={
                                <RequireAuth loginStatus={loginStatus}>
                                    <BulletinBoard />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/overview"
                            element={
                                <RequireAuth loginStatus={loginStatus}>
                                    <Overview />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/company"
                            element={
                                <RequireAuth loginStatus={loginStatus}>
                                    <Company signOut={runFirebaseSignOut} />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/bom"
                            element={
                                <RequireAuth loginStatus={loginStatus}>
                                    <Bom signOut={runFirebaseSignOut} />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/analysis"
                            element={
                                <RequireAuth loginStatus={loginStatus}>
                                    <Analysis signOut={runFirebaseSignOut} />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/quote"
                            element={
                                <RequireAuth loginStatus={loginStatus}>
                                    <Quote signOut={runFirebaseSignOut} />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/order"
                            element={
                                <RequireAuth loginStatus={loginStatus}>
                                    <Order signOut={runFirebaseSignOut} />
                                </RequireAuth>
                            }
                        />
                        <Route path="/*" element={<Navigate to="/" />} />
                    </Route>
                </Routes>
            </Router>
        </Container>
    );
}

export default App;
