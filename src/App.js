import styled from "styled-components";
import './App.css';
import LogIn from './LogIn';
import BulletinBoard from './BulletinBoard';
import Product from './Product';
import Admin from './Admin';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

const Container = styled.div`
  text-align: left;
`;

function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/" element={<BulletinBoard/>}/>
          <Route path="/product" element={<Product/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/*" element={<Navigate to="/"/>} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
