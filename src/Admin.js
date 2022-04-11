import styled from "styled-components";
import SideBar from "./SideBar";

import AdminParts from "./admin/AdminParts";
import AdminFirebase from "./admin/AdminFirebase"
const Container = styled.div`
  text-align: left;
`;
const Main = styled.div`
  margin-left: 300px;
  padding: 50px 10%;
`;

function Admin() {

  return (
    <Container>
      <SideBar />
      <Main>
        <AdminFirebase/>
        <AdminParts/>
      </Main>
    </Container>
  );
}

export default Admin;
