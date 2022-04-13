import styled from "styled-components";
import { useState, useEffect } from "react";
import SideBar from "./SideBar";
import db from "./utils/firebase";
import {
    doc,
    setDoc,
    collection,
    getDocs,
    Timestamp,
} from "firebase/firestore";
import Highcharts from "highcharts";

const Container = styled.div`
    text-align: left;
`;
const Main = styled.div`
    margin-left: 300px;
    padding: 50px 2%;
`;
const Cost = styled.div`
    padding: 20px 10%;
`;
const Suppliers = styled.div`
    padding: 20px 10%;
`;
const PartQuote = styled.div`
    padding: 20px 10%;
`;
const Submit = styled.div`
    padding: 20px 10%;
`;
const Title = styled.div`
    margin-bottom: 20px;
`;
const Form = styled.div`
    border: solid 1px #000000;
    padding: 20px;
`;
const Border = styled.div`
    border: solid 1px #000000;
    padding: 20px;
`;
const HighchartsDrawing = styled.div`
    width: 550px;
    height: 400px;
    margin: 0 auto;
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
    width: 70px;
    margin: 5px;
    text-align: center;
    cursor: pointer;
`;
const Th = styled.th`
    padding-right: 20px;
`;

const ThTwoColSpan = styled.th.attrs({
    colSpan: 2,
})`
    padding-right: 20px;
`;
const Td = styled.td`
    padding-right: 50px;
`;
const Flex = styled.div`
    display: flex;
`;

function Analysis() {
    return (
        <Container>
            <SideBar />
            <Main>
                <Cost>
                    <Title>成本分析</Title>
                    <Border>
                        <HighchartsDrawing id="container"></HighchartsDrawing>
                    </Border>
                </Cost>
            </Main>
        </Container>
    );
}

export default Analysis;
