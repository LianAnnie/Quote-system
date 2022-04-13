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
    const [productList, setProductList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(0);
    const [quotationData, setQuotationData] = useState([]);
    console.table(quotationData);

    useEffect(() => {
        getProductListFromFirebase();
    }, []);

    useEffect(() => {
        console.log(quotationData);
    }, [quotationData]);

    async function getQutationData(itemIndx) {
        const partList = await productList[itemIndx].bomList.map(e => e.id);
        let quotationData = [];
        partList.forEach(async (e, index) => {
            const partObject = {
                partId: e,
                quotation: [],
            };
            quotationData.push(partObject);
            const q = query(
                collection(db, "partQuotations"),
                where("id", "array-contains", e),
            );
            const data = await getDocs(q);
            data.forEach(quote => {
                const quoteData = quote.data();
                quotationData[index].quotation.push(quoteData);
                console.log(quoteData);
            });
        });
        setQuotationData(quotationData);
        console.log(123);
    }

    async function getProductListFromFirebase() {
        const list = await api.getCompleteCollection("products");
        setProductList(list);
    }

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
                    <Flex>
                        <select
                            onChange={e => {
                                setSelectedProduct(e.target.value);
                            }}
                            value={selectedProduct}
                        >
                            {productList &&
                                productList.map((e, index) => (
                                    <option key={index} value={index}>
                                        {e.name}
                                    </option>
                                ))}
                        </select>
                        <Button
                            onClick={() => getQutationData(selectedProduct)}
                        >
                            Add
                        </Button>
                    </Flex>
                    <Border>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options}
                        />
                    </Border>
                    {quotationData &&
                        quotationData.map((e, index) => (
                            <div key={index}>
                                <div>{e.id}</div>
                                <Table>
                                    <thead>
                                        <tr>
                                            <Th>零件名稱</Th>
                                            <Th>處理工藝</Th>
                                            <Th>零件材質</Th>
                                            <Th>表面處理</Th>
                                            <Th>報價數量</Th>
                                            <Th>零件單位</Th>
                                            <Th>零件單價</Th>
                                        </tr>
                                    </thead>

                                    {e.quotation &&
                                        e.quotation.map((j, index) => (
                                            <tbody key={index}>
                                                <Td>{j.name}</Td>
                                                <Td>{j.type}</Td>
                                                <Td>{j.material}</Td>
                                                <Td>{j.finish}</Td>
                                                <Td>{j.qty}</Td>
                                                <Td>{j.unit}</Td>
                                                <Td>{j.price}</Td>
                                                <Td>{j.currency}</Td>
                                            </tbody>
                                        ))}
                                </Table>
                            </div>
                        ))}
                </Cost>
            </Main>
        </Container>
    );
}

export default Analysis;
