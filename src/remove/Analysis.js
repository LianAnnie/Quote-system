import SideBar from "./component/SideBar";
import Drawing from "./component/Drawing";
import List from "./remove/List";
import api from "./utils/firebaseApi";
import {
    Container,
    Main,
    Section,
    Title,
    Table,
    Th,
    Td,
    Button,
    Border,
    Flex,
} from "./component/StyleComponent";
import { useState, useEffect } from "react";
import { db } from "./utils/firebase";
import { Timestamp, serverTimestamp } from "firebase/firestore";
import Highcharts from "highcharts";
import more from "highcharts/highcharts-more";
import form from "./utils/formChange";
more(Highcharts);
require("highcharts/modules/solid-gauge")(Highcharts);

function Analysis() {
    const [productList, setProductList] = useState([]); //總產品列表
    const [selectedList, setSelectedList] = useState([]); //篩選後的產品（帶很多inquiry qty)
    const [selectedProduct, setSelectedProduct] = useState([]); //產品表帶單一數量
    const [analysisProductIndex, setAnalysisProductIndex] = useState(0); //選定的分析產品資料的位置
    const [partQuotationsData, setPartQuotationsData] = useState([]); //Bom表內所有零件報價
    const [caculateData, setCaculatedData] = useState([]); //選定數量的零件報價

    const [sumCost, setSumCost] = useState(0);
    const [profitMargin, setProfitMargin] = useState(0);
    const [pieData, setPieData] = useState([["產品名稱", 100]]);

    // const [loading, setLoading] = useState(true);

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

    function handleAnalysisProductChange(itemIndex) {
        setAnalysisProductIndex(itemIndex);

        if (selectedProduct[itemIndex].price === 0) {
            const data = [...selectedProduct];
            const quoteIdList = caculateData.map(e => e.id);
            const maxLeadTime = caculateData
                .map(e => e.leadTime)
                .reduce((max, day) => (day > max ? (max = day) : max), 0);
            const minValid = caculateData
                .map(e => e.valid.seconds)
                .reduce((min, date) => (date < min ? (min = date) : min));
            console.log(minValid);
            console.log(quoteIdList);
            const newAnalysisList = data[itemIndex].analysisList.map(
                (e, index) => ({ ...e, quoteId: quoteIdList[index] }),
            );
            data[itemIndex].analysisList = newAnalysisList;
            data[itemIndex].price = sumCost;
            data[itemIndex].leadTime = maxLeadTime;
            data[itemIndex].valid = minValid;
            setSelectedProduct(data);
        }
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
        // console.log(partIndex, quotationIndex);
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
        const minValid = newCaculateData
            .map(e => e.valid.seconds)
            .reduce((min, date) => (date < min ? (min = date) : min));
        console.log(minValid);
        // setSumCost(sum);
        const newPrice = selectedProduct[analysisProductIndex].margin * sum;
        const data = [...selectedProduct];
        const quoteIdList = newCaculateData.map(e => e.id);
        const newAnalysisList = data[analysisProductIndex].analysisList.map(
            (e, index) => ({ ...e, quoteId: quoteIdList[index] }),
        );
        data[analysisProductIndex].analysisList = newAnalysisList;
        data[analysisProductIndex].price = newPrice;
        data[analysisProductIndex].leadTime = maxLeadTime;
        data[analysisProductIndex].valid = minValid;
        // console.log(selectedProduct);
        // console.log(data[analysisProductIndex].leadTime);
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

    function submit() {
        // console.log(selectedProduct);
        let i = 0;

        selectedProduct.map(e => {
            let id = [...e.id, form.transformId(i, 2)];
            const data = {
                id,
                date: serverTimestamp(),
                currency: "NT",
                // waiting fix: 加入匯率考慮之後要能調整
                name: e.name,
                qty: e.qty,
                image: "",
                price: e.price,
                margin: e.margin,
                leadTime: e.leadTime,
                valid: new Timestamp(e.valid, 0),
                analysisList: e.analysisList,
            };
            console.log(data);
            api.setDocWithId("analysis", id.join(""), data);
            i++;
        });
    }

    return (
        <Container>
            <SideBar />
            <Main>
                <List
                    productList={productList}
                    setPartQuotationsData={setPartQuotationsData}
                    setCaculatedData={setCaculatedData}
                    setSelectedProduct={setSelectedProduct}
                    setSumCost={setSumCost}
                    setPieData={setPieData}
                    setProductList={setProductList}
                    setSelectedList={setSelectedList}
                    selectedList={selectedList}
                />
                <Section>
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
                </Section>
                <Section>
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
                            {partQuotationsData.length > 0 &&
                                partQuotationsData?.map((quotations, index) => (
                                    <tr key={index}>
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
                                                        key={index2}
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
                                                selectedProduct[0]
                                                    .analysisList[0].qty}
                                        </Td>
                                        <Td>{caculateData[index].price}</Td>
                                        <Td>{caculateData[index].currency}</Td>
                                        <Td>
                                            {new Date(
                                                caculateData[
                                                    index
                                                ].valid.toDate(),
                                            ).toLocaleDateString()}
                                        </Td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </Section>
                <Section>
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
                    <Drawing profitMargin={profitMargin} pieData={pieData} />
                </Section>
            </Main>
        </Container>
    );
}
export default Analysis;
