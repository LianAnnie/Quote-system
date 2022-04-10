import styled from "styled-components";

const Container = styled.div`
  text-align: left;
`;

function LogIn() {
  return (
    <Container>
      <div>
          <form>
              <div>
                <div>User</div>
                <input type="text"></input>
              </div>
              <div>
                <div>PassWord</div>
                <input type="text"></input>
              </div>
          </form>
      </div>
    </Container>
  );
}

export default LogIn;