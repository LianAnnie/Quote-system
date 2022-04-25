import styled from "styled-components";
import SideBar from "../component/SideBar";
import { useState, useEffect } from "react";
import api from "../utils/firebaseApi";
import { Timestamp } from "firebase/firestore";
import form from "../utils/formChange";

const Container = styled.div`
    text-align: left;
    background-color: #fffae3;
`;
const Main = styled.div`
    margin-left: 300px;
    padding: 50px 2%;
`;
const Quotation = styled.div`
    padding: 20px 10%;
`;
const Products = styled.div`
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
    border-radius: 10px;
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
    width: 70px;
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

function Quote() {
    const quoteDataRule = {
        id: ["3客人id", "13產品編號", "02產品版本號", "報價日期"],
        date: "2022-04-01",
        valid: "2022-04-01",
        currency: "報價幣別",
        image: "產品圖片",
        quoteList: [
            {
                qty: "報價數量",
                price: "產品單價",
                analysisId: "分析id",
                leadTime: "生產天數",
            },
        ],
    };
    //同款產品一張報價單
    //!!!分析單上考慮報價零件有效期限,
    const [quoteDate, setQuoteDate] = useState("");
    const [validDate, setValidDate] = useState("");
    const [currency, setCurrency] = useState("");
    const [productList, setProductList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [quoteData, setQuoteData] = useState([]);
    const [finalQuoteList, setFinalQuoteList] = useState([]);
    const [exportQuoteData, setExportQuoteData] = useState(quoteDataRule);

    useEffect(() => {
        getProductListFromFirebase();
    }, []);

    async function getProductListFromFirebase() {
        const list = await api.getCompleteCollection("products");
        setProductList(list);
        setFinalQuoteList([]);
    }

    async function getFinalQuotaionListFromFirebase() {
        const list = await api.getCompleteCollection("productQuotations");
        setFinalQuoteList(list);
    }

    function addPorduct() {
        const quoteProduct = productList[selectedProduct];
        const inquiryQty = quoteProduct.inquiryQty;
        console.log(inquiryQty);
        const newData = [];
        inquiryQty.forEach(e => {
            const newQuoteProduct = JSON.parse(JSON.stringify(quoteProduct));
            newQuoteProduct.qty = e;
            newQuoteProduct.price = 0;
            newQuoteProduct.leadTime = "";
            newData.push(newQuoteProduct);
        });
        console.log(newData);
        setQuoteData(prev => [...prev, newData].flat(1));
    }

    function handleChange(index, e) {
        const data = form.handleChange(index, e, quoteData);
        setQuoteData(data);
    }

    function deleteProduct(itemIndex) {
        const data = form.deleteProduct(itemIndex, quoteData);
        setQuoteData(data);
    }

    function submit() {
        const sameDate = {
            date: new Timestamp(new Date(quoteDate).getTime() / 1000, 0),
            currency: currency,
            valid: new Timestamp(new Date(validDate).getTime() / 1000, 0),
        };
        let i = 0;
        quoteData.forEach(e => {
            const productId = e.id.join("").substring(3);
            const id = [productId, 2, i, quoteDate];
            const finalData = {
                id,
                date: sameDate.date,
                currency: sameDate.currency,
                valid: sameDate.valid,
                leadTime: e.leadTime,
                image: e.image,
                price: e.price,
                name: e.name,
                qty: e.qty,
            };
            api.setDocWithId("productQuotations", id.join(""), finalData);
            i++;
        });
    }

    return (
        <Container>
            <SideBar />
            <Main>
                <Flex>
                    <Button onClick={() => getFinalQuotaionListFromFirebase()}>
                        報價總表
                    </Button>
                    <Button onClick={() => getProductListFromFirebase()}>
                        表單
                    </Button>
                </Flex>
                {finalQuoteList.length === 0 && (
                    <>
                        <Quotation>
                            <Title>報價單</Title>

                            <Form>
                                <Question>
                                    <div>報價日期</div>
                                    <input
                                        type="date"
                                        onChange={e => {
                                            setQuoteDate(e.target.value);
                                        }}
                                        value={quoteDate}
                                    />
                                </Question>
                                <Question>
                                    <div>有效日期</div>
                                    <input
                                        type="date"
                                        onChange={e => {
                                            setValidDate(e.target.value);
                                        }}
                                        value={validDate}
                                    />
                                </Question>
                                <Question>
                                    <div>報價幣別</div>
                                    <input
                                        type="input"
                                        onChange={e => {
                                            setCurrency(e.target.value);
                                        }}
                                        value={currency}
                                    />
                                </Question>
                            </Form>
                        </Quotation>
                        <Products>
                            <Title>產品報價明細</Title>
                            <Flex>
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
                                <Button onClick={() => addPorduct()}>
                                    Add
                                </Button>
                            </Flex>
                            <Table>
                                <thead>
                                    <tr>
                                        <Th>編號</Th>
                                        <Th>名稱</Th>
                                        {/* <Th>圖片</Th> */}
                                        <Th>數量</Th>
                                        <Th>單價</Th>
                                        <Th>交期</Th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {quoteData &&
                                        quoteData.map((e, index) => (
                                            <tr key={index}>
                                                <Td>{e.id}</Td>
                                                <Td>{e.name}</Td>
                                                {/* <Td>{e.image}</Td> */}
                                                <Td>{e.qty}</Td>
                                                <Td>
                                                    <input
                                                        type="text"
                                                        name="price"
                                                        onChange={e =>
                                                            handleChange(
                                                                index,
                                                                e,
                                                            )
                                                        }
                                                        value={e.price}
                                                    />
                                                </Td>
                                                <Td>
                                                    <input
                                                        type="text"
                                                        name="leadTime"
                                                        onChange={e =>
                                                            handleChange(
                                                                index,
                                                                e,
                                                            )
                                                        }
                                                        value={e.leadTime}
                                                    />
                                                </Td>
                                                <Td>
                                                    <Button
                                                        onClick={() => {
                                                            deleteProduct(
                                                                index,
                                                            );
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </Td>
                                            </tr>
                                        ))}
                                </tbody>
                            </Table>
                        </Products>
                        <Submit>
                            <Button onClick={() => submit()}>Submit</Button>
                        </Submit>
                    </>
                )}
                {finalQuoteList.length > 0 && (
                    <>
                        <Products>
                            <Title>報價列表</Title>
                            <Table>
                                <thead>
                                    <tr>
                                        <Th>編號</Th>
                                        <Th>名稱</Th>
                                        <Th>圖片</Th>
                                        <Th>數量</Th>
                                        <Th>單價</Th>
                                        <Th>交期</Th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {finalQuoteList &&
                                        finalQuoteList.map((e, index) => (
                                            <tr key={index}>
                                                <Td>{e.id}</Td>
                                                <Td>{e.name}</Td>
                                                <Td>{e.image}</Td>
                                                <Td>{e.qty}</Td>
                                                <Td>{e.price}</Td>
                                                <Td>{e.leadTime}</Td>
                                            </tr>
                                        ))}
                                </tbody>
                            </Table>
                        </Products>
                    </>
                )}
            </Main>
        </Container>
    );
}

export default Quote;
