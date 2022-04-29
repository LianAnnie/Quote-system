import styled from "styled-components";
import "./App.css";
import LogIn from "./LogIn";
import BulletinBoard from "./BulletinBoard";
import Overview from "./Overview";
import Company from "./Company";
import Bom from "./Bom";
// import Parts from "./Parts";
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

const Container = styled.div`
    text-align: left;
`;

function App() {
    const [loginStatus, setLoginStatus] = useState(0);
    const [userId, setUserId] = useState("");
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
                            />
                        }
                    />
                    <Route path="/" element={<BulletinBoard />} />
                    <Route path="/overview" element={<Overview />} />
                    <Route path="/company" element={<Company />} />
                    <Route path="/bom" element={<Bom />} />
                    {/* <Route path="/parts" element={<Parts />} />*/}
                    <Route path="/analysis" element={<Analysis />} />
                    <Route path="/quote" element={<Quote />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </Container>
    );
}

export default App;
