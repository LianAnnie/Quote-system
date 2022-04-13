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
import HighchartsReact from "highcharts-react-official";

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
    const options = {
        chart: {
            type: "pie",
            marginBottom: 100,
        },
        title: {
            text: "成本分析",
        },
        series: [
            {
                allowPointSelect: true,
                size: "80%",
                innerSize: "60%",
                data: [
                    ["燈頭", 45.0],
                    ["底座", 26.8],
                    {
                        name: "LED",
                        y: 12.8,
                        sliced: true, // 突出显示某个扇区，表示强调
                    },
                    ["配件", 8.5],
                    ["LED", 6.2],
                    ["電器配件", 0.7],
                ],
            },
            {
                allowPointSelect: true,
                size: "60%",
                innerSize: "30%",
                data: [
                    ["燈頭", 50],
                    ["底座", 26.8],
                    {
                        name: "LED",
                        y: 12.8,
                        sliced: true, // 突出显示某个扇区，表示强调
                    },
                    ["配件", 8.5],
                    ["LED", 6.2],
                    ["電器配件", 0.7],
                ],
            },
        ],
    };

    return (
        <Container>
            <SideBar />
            <Main>
                <Cost>
                    <Title>成本分析</Title>
                    <Border>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options}
                        />
                    </Border>
                </Cost>
            </Main>
        </Container>
    );
}

export default Analysis;
