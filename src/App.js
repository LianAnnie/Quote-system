import styled from "styled-components";
import "./App.css";
import LogIn from "./LogIn";
import BulletinBoard from "./BulletinBoard";
import Bom from "./Bom";
import Parts from "./Parts";
import Analysis from "./Analysis";
import AnalysisTest from "./AnalysisTest";
import Quote from "./Quote";
import Admin from "./Admin";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

const Container = styled.div`
    text-align: left;
`;

function App() {
    return (
        <Container>
            <Router>
                <Routes>
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/" element={<BulletinBoard />} />
                    <Route path="/bom" element={<Bom />} />
                    <Route path="/parts" element={<Parts />} />
                    <Route path="/analysis" element={<Analysis />} />
                    <Route path="/analysis2" element={<AnalysisTest />} />
                    <Route path="/quote" element={<Quote />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </Container>
    );
}

export default App;
