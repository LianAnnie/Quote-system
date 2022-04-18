import styled from "styled-components";
import SideBar from "./SideBar";
import api from "./utils/firebaseApi";
import { useState, useEffect } from "react";
import db from "./utils/firebase";
import { query, collection, where, getDocs } from "firebase/firestore";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import more from "highcharts/highcharts-more";
more(Highcharts);
require("highcharts/modules/solid-gauge")(Highcharts);

const Container = styled.div`
    text-align: left;
`;
const Main = styled.div`
    margin-left: 300px;
    padding: 50px 2%;
`;
const Title = styled.div`
    margin-bottom: 20px;
`;
const Table = styled.table`
    border: solid 1px #000000;
    padding: 20px;
`;
const Th = styled.th`
    padding-right: 20px;
`;
const Td = styled.td`
    padding-right: 50px;
`;
const Button = styled.div`
    border: solid 1px #000000;
    width: 100px;
    margin: 5px;
    text-align: center;
    cursor: pointer;
`;
const Border = styled.div`
    border: solid 1px #000000;
    padding: 20px;
`;
const Flex = styled.div`
    display: flex;
`;

function Analysis2() {
    const [productList, setProductList] = useState([]);
    const [selectedList, setSelectedList] = useState([]);
    const [importData, setImportData] = useState([]);
    const [price, setPrice] = useState(0);
    const [sumCost, setSumCost] = useState(0);
    const [profitMargin, setProfitMargin] = useState(0);
    const [caculateData, setCaculatedData] = useState([]);
    const [expectedProfitMargin, setExpectedProfitMargin] = useState(0);
    const gaugeOptions = {
        chart: {
            type: "solidgauge",
        },
        title: null,
        pane: {
            center: ["50%", "85%"],
            size: "100%",
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || "#EEE",
                innerRadius: "60%",
                outerRadius: "100%",
                shape: "arc",
            },
        },

        exporting: {
            enabled: false,
        },

        tooltip: {
            enabled: false,
        },

        // the value axis
        yAxis: {
            stops: [
                [0.1, "#55BF3B"], // green
                [0.5, "#DDDF0D"], // yellow
                [0.9, "#DF5353"], // red
            ],
            lineWidth: 0,
            tickWidth: 0,
            minorTickInterval: null,
            tickAmount: 2,
            title: {
                y: -70,
            },
            labels: {
                y: 16,
            },
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true,
                },
            },
        },
        yAxis: {
            min: -100,
            max: 100,
            title: {
                text: "利潤率",
            },
        },

        credits: {
            enabled: false,
        },

        series: [
            {
                name: "利潤率",
                data: [profitMargin],
                dataLabels: {
                    format:
                        '<div style="text-align:center">' +
                        '<span style="font-size:25px">{y}</span><br/>' +
                        '<span style="font-size:12px;opacity:0.4">％</span>' +
                        "</div>",
                },
                tooltip: {
                    valueSuffix: "%",
                },
            },
        ],
    };

    useEffect(() => {
        getProductListFromFirebase();
    }, []);

    useEffect(() => {
        console.log(price);
        console.log(sumCost);
        console.log((price / sumCost) * 100);

        const caculate = Math.floor((price / sumCost) * 100 - 100);
        console.log(caculate);
        if (sumCost === 0) {
            setProfitMargin(0);
            return;
        }
        setProfitMargin(caculate);
    }, [price, caculateData]);

    async function getProductListFromFirebase() {
        const list = await api.getCompleteCollection("products");
        // console.table(list);
        setProductList(list);
        setSelectedList(list);
    }

    function handleListChange(e) {
        // console.log(e.target.value, "+", e.target, "+", e.target.name);
        const key = e.target.name;
        let value = e.target.value;
        console.log(key);
        if (value !== "noAction") {
            if (key === "id") {
                value = Number(e.target.value);
                let newList = selectedList.filter(e => e[key][1] === value);
                console.log(newList);
                if (newList.length === 0) {
                    newList = productList.filter(e => e[key][1] === value);
                }
                setSelectedList(newList);
                return;
            }
            if (key === "bomList") {
                let newList = selectedList.filter(e =>
                    e.bomList.some(m => m.id === value),
                );
                console.log(newList);
                if (newList.length === 0) {
                    newList = productList.filter(e =>
                        e.bomList.some(m => m.id === value),
                    );
                }
                setSelectedList(newList);

                return;
            }

            value = e.target.value;
            console.log(e.target.value);
            let newList = selectedList.filter(e => e[key] === value);
            if (newList.length === 0) {
                newList = productList.filter(e => e[key] === value);
            }
            setSelectedList(newList);
        }
        return;
    }

    async function handleImportChange(e, itemIndex) {
        const qty = Number(e.target.value);
        const partList = selectedList[itemIndex].bomList.map(e => e.id);

        const quotationDataPromise = partList.map(async e => {
            console.log(e);
            const q = query(
                collection(db, "partQuotations"),
                where("id", "array-contains", e),
                where("qty", ">=", qty),
            );
            const data = await getDocs(q);
            const promiseData = data.docs.map(e => e.data());
            //    console.log(test3);
            return promiseData;
        });

        const quotationData = await Promise.all(quotationDataPromise);
        console.log(quotationData);
        const newCaculateData = quotationData.map(e => (e[0] ? e[0] : []));
        console.log(newCaculateData);
        setCaculatedData(newCaculateData);
        setSumCost(
            newCaculateData.map(e => e.price).reduce((sum, e) => sum + e),
        );
        setImportData(quotationData);
    }

    function hadleQuotationChange(partIndex, quotationEelement) {
        const quotationIndex = Number(quotationEelement.target.value);
        console.log(partIndex, quotationIndex);
        const selectedImportData = importData[partIndex][quotationIndex];
        console.log(selectedImportData);
        const newCaculateData = JSON.parse(JSON.stringify(caculateData));
        newCaculateData[partIndex] = selectedImportData;
        console.log(caculateData);
        console.log(newCaculateData);
        setCaculatedData(newCaculateData);
        setSumCost(
            newCaculateData.map(e => e.price).reduce((sum, e) => sum + e),
        );
    }

    function showAllProduceList() {
        setSelectedList(productList);
    }

    return (
        <Container>
            <SideBar />
            <Main>
                <Title>產品列表</Title>
                <Button onClick={() => showAllProduceList()}>取消篩選</Button>
                <Table>
                    <thead>
                        <tr>
                            <Th>編號</Th>
                            <Th>版本</Th>
                            <Th>地區</Th>
                            <Th>客戶</Th>
                            <Th>名稱</Th>
                            <Th>零件</Th>
                        </tr>
                        <tr>
                            <Th>
                                <select
                                    name="id"
                                    onChange={e => handleListChange(e)}
                                    value={productList.id}
                                >
                                    <option value="noAction">請選擇</option>
                                    {productList &&
                                        productList.map((e, index) => (
                                            <option key={index} value={e.id[1]}>
                                                {e.id[1]}
                                            </option>
                                        ))}
                                </select>
                            </Th>
                            <Th></Th>
                            <Th>
                                <select
                                    name="country"
                                    onChange={e => handleListChange(e)}
                                    value={productList.coutry}
                                >
                                    <option value="noAction">請選擇</option>
                                    {productList &&
                                        productList
                                            .filter(
                                                (e, index, array) =>
                                                    array
                                                        .map(n => n.country)
                                                        .indexOf(e.country) ===
                                                    index,
                                            )
                                            .map((j, index) => (
                                                <option
                                                    key={index}
                                                    value={j.country}
                                                >
                                                    {j.country}
                                                </option>
                                            ))}
                                </select>
                            </Th>
                            <Th>
                                <select
                                    name="company"
                                    onChange={e => handleListChange(e)}
                                    value={productList.company}
                                >
                                    <option value="noAction">請選擇</option>
                                    {productList &&
                                        productList
                                            .filter(
                                                (e, index, array) =>
                                                    array
                                                        .map(n => n.company)
                                                        .indexOf(e.company) ===
                                                    index,
                                            )
                                            .map((j, index) => (
                                                <option
                                                    key={index}
                                                    value={j.company}
                                                >
                                                    {j.company}
                                                </option>
                                            ))}
                                </select>
                            </Th>
                            <Th>
                                <select
                                    name="name"
                                    onChange={e => handleListChange(e)}
                                    value={productList.name}
                                >
                                    <option value="noAction">請選擇</option>
                                    {productList &&
                                        productList
                                            .filter(
                                                (e, index, array) =>
                                                    array
                                                        .map(n => n.name)
                                                        .indexOf(e.name) ===
                                                    index,
                                            )
                                            .map((j, index) => (
                                                <option
                                                    key={index}
                                                    value={j.name}
                                                >
                                                    {j.name}
                                                </option>
                                            ))}
                                </select>
                            </Th>
                            <Th>
                                <select
                                    name="bomList"
                                    onChange={e => handleListChange(e)}
                                    value={productList.bomList}
                                >
                                    <option value="noAction">請選擇</option>
                                    {productList &&
                                        productList
                                            .map(e => e.bomList.map(n => n))
                                            .flat(1)
                                            .filter(
                                                (m, index, array) =>
                                                    array
                                                        .map(o => o.id)
                                                        .indexOf(m.id) ===
                                                    index,
                                            )
                                            .map((p, index2) => (
                                                <option
                                                    key={index2}
                                                    value={p.id}
                                                >
                                                    {p.name}
                                                </option>
                                            ))}
                                </select>
                            </Th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedList &&
                            selectedList.map((e, index) => (
                                <tr key={e.id}>
                                    <Td>{e.id[1]}</Td>
                                    <Td>{e.id[2]}</Td>
                                    <Td>{e.country}</Td>
                                    <Td>{e.company}</Td>
                                    <Td>{e.name}</Td>
                                    <Td></Td>
                                    <Td>
                                        <select
                                            value={e.inquiryQty[0]}
                                            onChange={e =>
                                                handleImportChange(e, index)
                                            }
                                            name="inquiryQty"
                                        >
                                            {e.inquiryQty.map(e => (
                                                <option key={e}>{e}</option>
                                            ))}
                                        </select>
                                        {/* <Button onClick={()=>importDataToAnalysis(index)}>Import</Button> */}
                                    </Td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
                <Table>
                    <thead>
                        <tr>
                            <Th>編號</Th>
                            <Th>名稱</Th>
                            <Th>數量</Th>
                            <Th>單價</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {importData &&
                            importData.map((quotations, index) => (
                                <tr key={index}>
                                    <Td>{caculateData[index].id}</Td>
                                    <Td>{caculateData[index].name}</Td>
                                    <Td>
                                        <select
                                            name="qty"
                                            onChange={e =>
                                                hadleQuotationChange(index, e)
                                            }
                                        >
                                            {quotations.map((e, index2) => (
                                                <option
                                                    key={e.id}
                                                    value={index2}
                                                >
                                                    {e.qty}
                                                </option>
                                            ))}
                                        </select>
                                    </Td>
                                    <Td>{caculateData[index].price}</Td>
                                    <Td></Td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
                <Flex>
                    <Title>目前總成本</Title>
                    <div>{sumCost}</div>
                </Flex>
                <Flex>
                    <Title>輸入期望利潤</Title>
                    <input
                        type="text"
                        onChange={e => setExpectedProfitMargin(e.target.value)}
                        value={expectedProfitMargin}
                    />
                    <Title>需提報最低單價</Title>
                    <div>
                        {sumCost * expectedProfitMargin < 0
                            ? "利潤率需大於0"
                            : (sumCost * expectedProfitMargin) / 100}
                    </div>
                </Flex>
                <Flex>
                    <Title>預計產品單價</Title>
                    <input
                        type="text"
                        onChange={e => setPrice(e.target.value)}
                        value={price}
                    />
                </Flex>
                <Border>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={gaugeOptions}
                        containerProps={{ className: "chart-container" }}
                    />
                </Border>
            </Main>
        </Container>
    );
}
export default Analysis2;
