import styled from "styled-components";
import './App.css';
import LogIn from './LogIn';
import BulletinBoard from './BulletinBoard';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const Container = styled.div`
  text-align: left;
`;

function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/" element={<LogIn/>}/>
          <Route path="/board" element={<BulletinBoard/>}/>
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
