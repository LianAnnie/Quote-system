import styled from "styled-components";
import SideBar from "./SideBar";
import api from "./utils/firebaseApi";
import { useState, useEffect } from "react";
import db from "./utils/firebase";
import { query, collection, where, getDocs } from "firebase/firestore";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import more from "highcharts/highcharts-more";
import form from "./component/formChange";
more(Highcharts);
require("highcharts/modules/solid-gauge")(Highcharts);

const Container = styled.div`
    text-align: left;
`;
const Main = styled.div`
    margin-left: 300px;
    padding: 50px 2%;
`;
const Products = styled.div`
    padding: 20px 10%;
`;
const Product = styled.div`
    padding: 20px 10%;
`;
const Quotes = styled.div`
    padding: 20px 10%;
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
    width: 150px;
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

function Analysis() {
    const [productList, setProductList] = useState([]); //總產品列表
    const [selectedList, setSelectedList] = useState([]); //篩選後的產品（帶很多inquiry qty)
    const [selectedProduct, setSelectedProduct] = useState([]); //產品表帶單一數量
    const [analysisProductIndex, setAnalysisProductIndex] = useState(0); //選定的分析產品資料的位置
    const [partQuotationsData, setPartQuotationsData] = useState([]); //Bom表內所有零件報價
    const [caculateData, setCaculatedData] = useState([]); //選定數量的零件報價

    const [sumCost, setSumCost] = useState(0); //
    const [profitMargin, setProfitMargin] = useState(0);
    const [pieData, setPieData] = useState([["產品名稱", 100]]);

    const [loading, setLoading] = useState(true);

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
    useEffect(() => {
        getProductListFromFirebase();
    }, []);

    useEffect(() => {
        if (selectedProduct.length > 0) {
            const caculate = Math.floor(
                (selectedProduct[analysisProductIndex].price / sumCost) * 100 -
                    100,
            );
            // console.log(caculate);
            if (sumCost === 0) {
                setProfitMargin(0);
                return;
            }
            setProfitMargin(caculate);
        }
    }, [selectedProduct, caculateData, analysisProductIndex, sumCost]);

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

    async function getPartsQtationsFromFireBase(partIdList) {
        const quotationDataPromise = partIdList.map(async e => {
            const q = query(
                collection(db, "partQuotations"),
                where("id", "array-contains", e),
            );
            const data = await getDocs(q);
            const promiseData = data.docs.map(e => e.data());
            return promiseData;
        });

        const quotationData = await Promise.all(quotationDataPromise);
        return quotationData;
    }

    async function handleProductChange(data) {
        console.log(data);
        setSelectedProduct([]);
        const renderProductData = changeSelectedProductToRander(data);
        console.log(renderProductData);
        setSelectedProduct(renderProductData);
        const partIdList = data.bomList.map(e => e.id);
        const quotationData = await getPartsQtationsFromFireBase(partIdList);
        console.log(quotationData);
        const newCaculateData = quotationData.map(e => (e[0] ? e[0] : []));
        console.log(newCaculateData);
        setCaculatedData(newCaculateData);
        const usageList = data.bomList.map(e => Number(e.qty));
        console.log(usageList);

        const sum = newCaculateData
            .map(e => e.price)
            .reduce((sum1, m, index) => sum1 + m * usageList[index], 0);

        console.log(newCaculateData);
        console.log(sum);
        setSumCost(sum);
        getPieData(newCaculateData, sum);
        setPartQuotationsData(quotationData);
    }

    function handleAnalysisProductChange(itemIndex) {
        // console.log(itemIndex, data);
        // console.log(caculateData);

        setAnalysisProductIndex(itemIndex);

        if (selectedProduct[itemIndex].price === 0) {
            const data = [...selectedProduct];
            const quoteIdList = caculateData.map(e => e.id);
            const maxLeadTime = caculateData
                .map(e => e.leadTime)
                .reduce((max, day) => (day > max ? (max = day) : max), 0);
            console.log(maxLeadTime);
            console.log(quoteIdList);
            const newAnalysisList = data[itemIndex].analysisList.map(
                (e, index) => ({ ...e, quoteId: quoteIdList[index] }),
            );
            data[itemIndex].analysisList = newAnalysisList;
            data[itemIndex].price = sumCost;
            data[itemIndex].leadTime = maxLeadTime;
            setSelectedProduct(data);
        }
    }

    function changeSelectedProductToRander(data) {
        console.log(data);
        const analysisList = data.bomList.map(e => {
            const partUseage = {
                qty: Number(e.qty),
                quoteId: e.id,
            };
            return partUseage;
        });
        console.log(analysisList);
        const newArray = data.inquiryQty.map(e => {
            const renderData = {
                id: data.id,
                qty: e,
                company: data.company,
                country: data.country,
                name: data.name,
                price: 0,
                margin: 1,
                currency: "",
                analysisList,
                leadTime: 30,
            };
            return renderData;
        });
        return newArray;
    }

    function handleProductPriceChange(index, e) {
        const newData = form.handleChange(index, e, selectedProduct);
        setSelectedList(newData);
        console.log([e.target.name], newData[index][e.target.name]);
    }

    function getPieData(data, totalPrice) {
        const getDataArray = data.map(e => [
            e.name,
            Math.floor((e.price / totalPrice) * 100),
        ]);
        setPieData(getDataArray);
    }

    function handleQuotationChange(partIndex, quotationEelement) {
        const quotationIndex = Number(quotationEelement.target.value);
        console.log(partIndex, quotationIndex);
        const selectedImportData =
            partQuotationsData[partIndex][quotationIndex];
        // console.log(selectedImportData);
        const newCaculateData = [...caculateData];
        newCaculateData[partIndex] = selectedImportData;
        // console.log(caculateData);
        console.log(newCaculateData);
        setCaculatedData(newCaculateData);
        getPieData(newCaculateData, sumCost);
        const usageList = selectedProduct[0].analysisList.map(e => e.qty);
        const sum = newCaculateData
            .map(e => e.price)
            .reduce((sum1, m, index) => sum1 + m * usageList[index], 0);
        const maxLeadTime = newCaculateData
            .map(e => e.leadTime)
            .reduce((max, day) => (day > max ? (max = day) : max), 0);
        console.log(maxLeadTime);
        setSumCost(sum);
        const newPrice = selectedProduct[analysisProductIndex].margin * sum;
        const data = [...selectedProduct];
        const quoteIdList = newCaculateData.map(e => e.id);
        const newAnalysisList = data[analysisProductIndex].analysisList.map(
            (e, index) => ({ ...e, quoteId: quoteIdList[index] }),
        );
        data[analysisProductIndex].analysisList = newAnalysisList;
        data[analysisProductIndex].price = newPrice;
        data[analysisProductIndex].leadTime = maxLeadTime;
        console.log(selectedProduct);
        console.log(data[analysisProductIndex].leadTime);
        setSelectedProduct([...data]);
    }

    function handleAnalysisProductPriceChange(e) {
        // console.log(e.target.name);
        selectedProduct[analysisProductIndex][e.target.name] = e.target.value;
        if (e.target.name === "price") {
            selectedProduct[analysisProductIndex].margin =
                Math.floor((e.target.value * 100) / Number(sumCost)) / 100;
        }
        if (e.target.name === "margin") {
            selectedProduct[analysisProductIndex].price =
                Number(sumCost) * e.target.value;
        }
        // selectedProduct[analysisProductIndex][e.target.name]=e.target.value
        setSelectedProduct([...selectedProduct]);
    }

    function showAllProduceList() {
        setSelectedList(productList);
    }

    function submit() {
        console.log(selectedProduct);
        let i = 0;

        selectedProduct.map(e => {
            const data = {
                id: [...e.id, Date.now(), form.transformId(i, 2)],
                date: Date.now(),
                currency: "NT",
                //waiting fix: 加入匯率考慮之後要能調整
                name: e.name,
                qty: e.qty,
                image: e.image,
                price: e.price,
                margin: e.margin,
                leadTime: e.leadTime,
                analysisList: e.analysisList,
            };
            console.log(data);
            i++;
        });
    }

    return (
        <Container>
            <SideBar />
            <Main>
                <Products>
                    <Title>產品列表</Title>
                    <Button onClick={() => showAllProduceList()}>
                        取消篩選
                    </Button>
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
                                                <option
                                                    key={index}
                                                    value={e.id[1]}
                                                >
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
                                                            .indexOf(
                                                                e.country,
                                                            ) === index,
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
                                                            .indexOf(
                                                                e.company,
                                                            ) === index,
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
                                    <tr key={index}>
                                        <Td>{e.id[1]}</Td>
                                        <Td>{e.id[2]}</Td>
                                        <Td>{e.country}</Td>
                                        <Td>{e.company}</Td>
                                        <Td>{e.name}</Td>
                                        <Td></Td>
                                        <Td>
                                            <input
                                                type="radio"
                                                name="product"
                                                onClick={() =>
                                                    handleProductChange(e)
                                                }
                                            />
                                        </Td>
                                        {/* <Td>
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
                                        </Td> */}
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </Products>
                <Product>
                    <Flex>
                        <Title>分析產品</Title>
                        <Button onClick={() => submit()}>Submit</Button>
                    </Flex>
                    <Table>
                        <thead>
                            <tr>
                                <Th>編號</Th>
                                <Th>版本</Th>
                                <Th>名稱</Th>
                                <Th>數量</Th>
                                <Th>單價</Th>
                                <Th>利潤率</Th>
                                <Th>參考報價編號</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedProduct &&
                                selectedProduct.map((e, index) => (
                                    <tr key={index}>
                                        <Td>{e.id[1]}</Td>
                                        <Td>{e.id[2]}</Td>
                                        <Td>{e.name}</Td>
                                        <Td>{e.qty}</Td>
                                        <Td>
                                            {analysisProductIndex === index ? (
                                                <input
                                                    name="price"
                                                    value={e.price}
                                                    onChange={e =>
                                                        handleProductPriceChange(
                                                            index,
                                                            e,
                                                        )
                                                    }
                                                />
                                            ) : (
                                                <div>{e.price}</div>
                                            )}
                                        </Td>
                                        <Td>
                                            {analysisProductIndex === index ? (
                                                <input
                                                    name="margin"
                                                    value={e.margin}
                                                    onChange={e =>
                                                        handleProductPriceChange(
                                                            index,
                                                            e,
                                                        )
                                                    }
                                                />
                                            ) : (
                                                <div>{e.margin}</div>
                                            )}
                                        </Td>
                                        <Td>{e.currency}</Td>
                                        <Td>
                                            {e.analysisList.map((e, index) => (
                                                <div key={index}>
                                                    {e.quoteId}
                                                </div>
                                            ))}
                                        </Td>
                                        <Td>
                                            <input
                                                type="radio"
                                                name="quotation"
                                                onClick={() =>
                                                    handleAnalysisProductChange(
                                                        index,
                                                        e,
                                                    )
                                                }
                                            />
                                        </Td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </Product>
                <Quotes>
                    <Table>
                        <thead>
                            <tr>
                                <Th>編號</Th>
                                <Th>名稱</Th>
                                <Th>數量</Th>
                                <Th>使用量</Th>
                                <Th>單價</Th>
                                <Th>幣別</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* waiting fix: 這裡一直爆開是非同步的問題？ */}
                            {partQuotationsData.length > 0 &&
                                partQuotationsData.map((quotations, index) => (
                                    <tr key={index}>
                                        {/* {console.log(caculateData[index].qty)} */}
                                        <Td>{caculateData[index].id}</Td>
                                        <Td>{caculateData[index].name}</Td>
                                        <Td>
                                            <select
                                                name="qty"
                                                onChange={e =>
                                                    handleQuotationChange(
                                                        index,
                                                        e,
                                                    )
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
                                        <Td>
                                            {selectedProduct &&
                                                selectedProduct.length > 0 &&
                                                selectedProduct[0].analysisList[
                                                    index
                                                ].qty}
                                        </Td>
                                        <Td>{caculateData[index].price}</Td>
                                        <Td>{caculateData[index].currency}</Td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </Quotes>
                <Border>
                    <Flex>
                        <Title>目前總成本</Title>
                        <div>{sumCost}</div>
                    </Flex>
                    <Flex>
                        <Title>輸入期望利潤</Title>
                        {selectedProduct.length > 0 && (
                            <input
                                type="text"
                                name="margin"
                                onChange={e =>
                                    handleAnalysisProductPriceChange(e)
                                }
                                value={
                                    selectedProduct[analysisProductIndex].margin
                                }
                            />
                        )}
                    </Flex>
                    <Flex>
                        <Title>預計產品單價</Title>
                        {selectedProduct.length > 0 && (
                            <input
                                type="text"
                                name="price"
                                onChange={e =>
                                    handleAnalysisProductPriceChange(e)
                                }
                                value={
                                    selectedProduct[analysisProductIndex].price
                                }
                            />
                        )}
                    </Flex>
                    <Flex>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={gaugeOptions}
                            containerProps={{ className: "chart-container" }}
                        />

                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options}
                        />
                    </Flex>
                </Border>
            </Main>
        </Container>
    );
}
export default Analysis;
