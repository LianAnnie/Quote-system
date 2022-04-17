import styled from "styled-components";
import { useState, useEffect } from "react";
import api from "./utils/firebaseApi";
import db from "./utils/firebase";
import { query, collection, where, getDocs } from "firebase/firestore";
import SideBar from "./SideBar";
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
const Title = styled.div`
    margin-bottom: 20px;
`;

const Border = styled.div`
    border: solid 1px #000000;
    padding: 20px;
`;

const Table = styled.table`
    border: solid 1px #000000;
    padding: 20px;
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

const Td = styled.td`
    padding-right: 50px;
`;
const Flex = styled.div`
    display: flex;
`;

function Analysis() {
    const [productList, setProductList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [quotationData, setQuotationData] = useState([]);
    const [selectedQuote, setSelectedQuote] = useState([]);
    const [pieData, setPieData] = useState([["產品名稱", 100]]);

    console.log(selectedQuote);

    useEffect(() => {
        getProductListFromFirebase();
    }, []);

    useEffect(() => {
        if (productList.length > 0) {
            getQutationData(selectedProduct);
            getSelectProductName(selectedProduct);
        }
    }, [selectedProduct]);

    async function getQutationData(itemIndx) {
        const partList = productList[itemIndx].bomList.map(e => e.id);
        let quotationData = [];
        await Promise.all(
            partList.map(async partId => {
                const q = query(
                    collection(db, "partQuotations"),
                    where("id", "array-contains", partId),
                );
                const data = await getDocs(q);
                data.forEach(itemData => {
                    quotationData.push(itemData.data());
                });
            }),
        );
        //waiting review
        quotationData.map(e => (e.id = e.id.join("")));
        setQuotationData(quotationData);
        // const array = [...Array(quotationData.length)].map(e => e=false);
        // const array = quotationData.map(e => ({[e.id.join('')]: false}))
        // const array = quotationData.map(e => ({'id':e.id.join(''), 'status': false}))
        const array = quotationData.map(e => [e.id, false]);
        const object = Object.fromEntries(array);
        setSelectedQuote(object);
    }
    async function getSelectProductName(itemIndex) {
        const productName = productList[itemIndex].name;
        console.log(productName);
        const setArry = [[productName, 100]];
        setPieData(setArry);
    }
    async function getProductListFromFirebase() {
        const list = await api.getCompleteCollection("products");
        console.log(list);
        setProductList(list);
    }
    function changeSelectedQuoteState(e) {
        const id = e.target.value;
        const newObject = JSON.parse(JSON.stringify(selectedQuote));
        // console.log(newObject[id]);
        newObject[id] = !selectedQuote[id];
        // console.log(newObject[id]);
        setSelectedQuote(newObject);
    }
    function importSelectedQuote() {
        const importData = quotationData.filter(e => selectedQuote[e.id] && e);
        analysisData(importData);
    }
    function analysisData(data) {
        const totalPrice = data.reduce(
            (previousValue, currentValue) => previousValue + currentValue.price,
            0,
        );
        const getDataArray = data.map(e => [
            e.name,
            (e.price / totalPrice) * 100,
        ]);
        setPieData(getDataArray);
    }
    const options = {
        chart: {
            type: "pie", //"pie","column"
            marginBottom: 100,
        },
        title: {
            text: "成本分析",
        },
        series: [
            {
                allowPointSelect: true,
                size: "60%",
                innerSize: "30%",
                data: pieData,
            },
        ],
    };

    const options2 = {
        chart: {
            type: "column",
        },
        title: {
            text: "供應商比價",
        },
        xAxis: {
            categories: [50, 200, 500, 1000],
            crosshair: true,
        },
        yAxis: {
            min: 0,
            title: {
                text: "NT",
            },
        },
        tooltip: {
            headerFormat:
                '<span style="font-size:10px">{point.key}</span><table>', //標示廠商
            pointFormat:
                '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
            footerFormat: "</table>",
            shared: true,
            useHTML: true,
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
        },
        credits: {
            enabled: false,
        },
        series: [
            {
                name: "Shine",
                data: [150, 80, 70, 50],
            },
            {
                name: "Slite",
                data: [0, 0, 130, 100],
            },
        ],
    };

    const options3 = {
        chart: {
            zoomType: "xy",
        },
        title: {
            text: "產品利潤比",
        },
        xAxis: {
            categories: [2015, 2016, 2017, 2018, 2019, 2020, 2021],
            crosshair: true,
        },
        yAxis: [
            {
                // 第一条Y轴
                labels: {
                    format: "{value} NT",
                    style: {
                        color: Highcharts.getOptions().colors[1],
                    },
                },
                title: {
                    text: "產品單價",
                    style: {
                        color: Highcharts.getOptions().colors[1],
                    },
                },
            },
            {
                // 第二条Y轴
                title: {
                    text: "利潤率",
                    style: {
                        color: Highcharts.getOptions().colors[0],
                    },
                },
                labels: {
                    format: "{value}%",
                    style: {
                        color: Highcharts.getOptions().colors[0],
                    },
                },
                opposite: true,
            },
        ],
        tooltip: {
            shared: true,
        },
        legend: {
            layout: "vertical",
            align: "left",
            x: 120,
            verticalAlign: "top",
            y: 100,
            floating: true,
            backgroundColor:
                (Highcharts.theme && Highcharts.theme.legendBackgroundColor) ||
                "#FFFFFF",
        },
        series: [
            {
                name: "利潤率",
                type: "column",
                yAxis: 1,
                data: [20, 25, 13.2, 15, 20, 22, 24],
                tooltip: {
                    valueSuffix: "%",
                },
            },
            {
                name: "產品單價",
                type: "spline",
                data: [50, 70, 70, 75, 80, 85, 100],
                tooltip: {
                    valueSuffix: "NT",
                },
            },
        ],
    };

    return (
        <Container>
            <SideBar />
            <Main>
                <Cost>
                    <Title>成本分析</Title>
                    <select
                        onChange={e => {
                            setSelectedProduct(e.target.value);
                        }}
                        value={selectedProduct}
                    >
                        {selectedProduct === "" && (
                            <option value={0}>請選擇</option>
                        )}
                        {productList &&
                            productList.map((e, index) => (
                                <option key={index} value={index}>
                                    {e.name}
                                </option>
                            ))}
                    </select>
                    <Border>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options}
                        />
                    </Border>
                    <Border>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options2}
                        />
                    </Border>
                    <Border>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options3}
                        />
                    </Border>
                    <Table>
                        <thead>
                            <tr>
                                <Th>報價單號</Th>
                                <Th>零件名稱</Th>
                                <Th>處理工藝</Th>
                                <Th>零件材質</Th>
                                <Th>表面處理</Th>
                                <Th>報價數量</Th>
                                <Th>零件單位</Th>
                                <Th>零件單價</Th>
                                <Th>貨幣</Th>
                                <Th>供應商</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {quotationData &&
                                quotationData.map(e => (
                                    <tr key={e.id}>
                                        <Td>{e.id}</Td>
                                        <Td>{e.name}</Td>
                                        <Td>{e.type}</Td>
                                        <Td>{e.material}</Td>
                                        <Td>{e.finish}</Td>
                                        <Td>{e.qty}</Td>
                                        <Td>{e.unit}</Td>
                                        <Td>{e.price}</Td>
                                        <Td>{e.currency}</Td>
                                        <Td>{e.company}</Td>
                                        <Td>
                                            <input
                                                type="checkbox"
                                                value={e.id}
                                                onChange={e =>
                                                    changeSelectedQuoteState(e)
                                                }
                                                checked={selectedQuote.value}
                                            />
                                        </Td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                    <Button onClick={() => importSelectedQuote()}>
                        Import
                    </Button>
                </Cost>
            </Main>
        </Container>
    );
}

export default Analysis;
