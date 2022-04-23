import styled from "styled-components";
import SideBar from "./component/SideBar";
import { useState, useEffect } from "react";
import api from "./utils/firebaseApi";
import form from "./utils/formChange";

const Container = styled.div`
    text-align: left;
`;
const Main = styled.div`
    margin-left: 300px;
    padding: 50px 2%;
`;
const Quotation = styled.div`
    padding: 20px 10%;
`;
const Question = styled.div`
    display: flex;
    margin: 5px;
`;
const Products = styled.div`
    padding: 20px 10%;
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
const Submit = styled.div`
    padding: 20px 10%;
`;

function Order() {
    const orderDataRule = {
        id: ["客人id"],
        date: "2022-04-01",
        requiredDate: "2022-12-31",
        total: 0,

        productList: [
            {
                id: "產品id",
                currency: "報價幣別",
                leadTime: "生產天數",
                price: "產品單價",
                name: "產品名稱",
                qty: "報價數量",
                analysisId: "分析id",
            },
        ],
    };
    //用客戶抓產品名稱匯入,按輸入產品數量會提示對應產品單價
    //報價效期已過期的報價（另列參考但不輸入？）
    //生產天數如果超過需求日期（顯示提示資料）

    const [customerList, setCustomerList] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [quoteList, setQuoteList] = useState([]);
    const [selectedQuoteIndex, setSelectedQuoteIndex] = useState("");
    const [exportOrderData, setExportOrderData] = useState(orderDataRule);

    useEffect(() => {
        getCustomerListFromFirebase();
    }, []);

    async function getCustomerListFromFirebase() {
        const list = await api.getCompleteCollection("customers");
        setCustomerList(list);
        setQuoteList([]);
    }

    async function getOrderListFromFirebase() {
        const list = await api.getCompleteCollection("order");
        setOrderList(list);
        setQuoteList([]);
    }

    async function getQuoteListFromFirebase() {
        const list = await api.getCompleteCollection("productQuotations", "");
        console.log(list);
        setQuoteList(list);
    }

    function handleExportOrderDataChange(e, index) {
        console.log(e.target.value, e.target.name);
        if (e.target.name === "id0") {
            const newExportedData = exportOrderData;
            console.log(customerList[e.target.value]);
            newExportedData.id[0] = customerList[e.target.value].id;
            setExportOrderData(newExportedData);
        }
        const newData = form.handleChange("_", e, exportOrderData);
        console.log(newData);
        setExportOrderData(newData);
        getQuoteListFromFirebase();
    }

    function addQuote() {
        if (selectedQuoteIndex === "") {
            console.log(`請選擇報價資料再按加入`);
            return;
        }
        const orderProduct = quoteList[selectedQuoteIndex];

        // const inquiryQty = quoteProduct.inquiryQty;
        // console.log(inquiryQty);
        // const newData = [];
        // inquiryQty.forEach(e => {
        //     const newQuoteProduct = JSON.parse(JSON.stringify(quoteProduct));
        //     newQuoteProduct.qty = e;
        //     newQuoteProduct.price = 0;
        //     newQuoteProduct.leadTime = "";
        //     newData.push(newQuoteProduct);
        // });
        // console.log(newData);
        // setQuoteData(prev => [...prev, newData].flat(1));
    }

    return (
        <Container>
            <SideBar />
            <Main>
                <Flex>
                    <Button onClick={() => getOrderListFromFirebase()}>
                        訂單總表
                    </Button>
                    <Button onClick={() => getCustomerListFromFirebase()}>
                        表單
                    </Button>
                </Flex>
                <Quotation>
                    <Title>訂單</Title>

                    <Form>
                        <Question>
                            <div>客戶</div>
                            <select
                                name="id0"
                                onChange={e => {
                                    handleExportOrderDataChange(e);
                                }}
                                value={exportOrderData.id[0]}
                            >
                                <option value="">請選擇</option>
                                {customerList &&
                                    customerList.map((e, index) => (
                                        <option key={e.id} value={index}>
                                            {e.company}
                                        </option>
                                    ))}
                            </select>
                        </Question>
                        <Question>
                            <div>訂單日期</div>
                            <input
                                type="date"
                                name="date"
                                onChange={e => {
                                    handleExportOrderDataChange(e, 0);
                                }}
                                value={exportOrderData.date}
                            />
                        </Question>
                        <Question>
                            <div>交貨日期</div>
                            <input
                                type="date"
                                name="requiredDate"
                                onChange={e => {
                                    handleExportOrderDataChange(e, 0);
                                }}
                                value={exportOrderData.requiredDate}
                            />
                        </Question>
                        <Question>
                            <div>訂單總價</div>
                            <input
                                type="total"
                                onChange={e => {
                                    // setValidDate(e.target.value);
                                }}
                                // value={validDate}
                            />
                        </Question>
                    </Form>
                </Quotation>
                <Products>
                    <Title>報價參考資料</Title>
                    <Flex>
                        <select
                            onChange={e => {
                                setSelectedQuoteIndex(e.target.value);
                            }}
                            value={selectedQuoteIndex}
                        >
                            {selectedQuoteIndex === "" && (
                                <option value="">請選擇</option>
                            )}
                            {quoteList &&
                                quoteList.map((e, index) => (
                                    <option key={index} value={index}>
                                        {e.name}
                                    </option>
                                ))}
                        </select>
                        <Button onClick={() => addQuote()}>Add</Button>
                    </Flex>
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
                            {/* {quoteData &&
                                        quoteData.map((e, index) => (
                                            <tr key={index}>
                                                <Td>{e.id}</Td>
                                                <Td>{e.name}</Td>
                                                <Td>{e.image}</Td>
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
                                        ))} */}
                        </tbody>
                    </Table>
                </Products>
                <Submit>
                    <Button
                    // onClick={() => submit()}
                    >
                        Submit
                    </Button>
                </Submit>
            </Main>
        </Container>
    );
}

export default Order;
