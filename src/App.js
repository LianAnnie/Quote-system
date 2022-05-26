import styled from "styled-components";
import "./App.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import LogIn from "./LogIn";
import BulletinBoard from "./BulletinBoard";
import Overview from "./Overview";
import Company from "./Company";
import Bom from "./Bom";
import Analysis from "./Analysis";
import Quote from "./Quote";
import Order from "./Order";
import SideBar from "./component/SideBar";
import Loading from "./component/Loading";
import api from "./utils/api";

const Container = styled.div`
    text-align: left;
`;

function RequireAuth({ children, loginStatus }) {
    const location = useLocation();
    if (loginStatus === 0) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    if (loginStatus === 2) {
        return <Loading />;
    }
    return children;
}

RequireAuth.propTypes = {
    children: PropTypes.object.isRequired,
    loginStatus: PropTypes.number.isRequired,
};

function App() {
    const [loginStatus, setLoginStatus] = useState(2);
    const [message, setMessage] = useState("");

    const [viewMode, setViewMode] = useState(1);
    const RouteArray = [
        ["/", BulletinBoard],
        ["/overview", Overview],
        ["/company", Company],
        ["/bom", Bom],
        ["/analysis", Analysis],
        ["/quote", Quote],
        ["/order", Order],
    ];

    useEffect(() => {
        api.checkLogInState(user => {
            if (user) {
                setLoginStatus(1);
                setMessage(`歡迎回來`);
            } else {
                setLoginStatus(0);
            }
        });
    }, []);

    function checkErrorMessage(msg) {
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

    function signOut() {
        api.runFirebaseSignOut(setMessage, setLoginStatus, checkErrorMessage);
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
                                signOut={() => signOut()}
                                setMessage={setMessage}
                                message={message}
                                checkErrorMessage={() => checkErrorMessage()}
                            />
                        }
                    />
                    <Route
                        element={
                            <SideBar
                                signOut={signOut}
                                viewMode={viewMode}
                                setViewMode={setViewMode}
                            />
                        }
                    >
                        {RouteArray.map(([path, Component]) => (
                            <Route
                                key={path}
                                path={path}
                                element={
                                    <RequireAuth loginStatus={loginStatus}>
                                        <Component />
                                    </RequireAuth>
                                }
                            />
                        ))}
                        <Route path="/*" element={<Navigate to="/" />} />
                    </Route>
                </Routes>
            </Router>
        </Container>
    );
}

export default App;
