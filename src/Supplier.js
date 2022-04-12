import styled from "styled-components";
import { useState, useEffect } from "react";
import SideBar from "./SideBar";
import db from "./utils/firebase";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { render } from "@testing-library/react";

const Container = styled.div`
  text-align: left;
`;
const Main = styled.div`
  margin-left: 300px;
  padding: 50px 10%;
`;
const Title = styled.div`
  margin-bottom: 20px;
`;
const Form = styled.div`
  border: solid 1px #000000;
  padding: 20px;
`;
const Table = styled.table`
  border: solid 1px #000000;
  padding: 20px;
`;
const Question = styled.div`
  display: flex;
  margin: 5px;
`;
const Button = styled.div`
  border: solid 1px #000000;
  width: 55px;
  margin: 5px;
  text-align: center;
  cursor: pointer;
`;
const Th = styled.th`
  padding-right: 50px;
`;
const Td = styled.td`
  padding-right: 50px;
`;
const Flex = styled.div`
  display: flex;
`;

function Supplier(){

    return(
        <Container>
            <SideBar />
            <Main>

            </Main>
        </Container>
    )
}