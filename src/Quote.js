import styled from "styled-components";
import SideBar from "./SideBar";
import { useState, useEffect } from "react";
import api from "./utils/firebaseApi";

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
    const [quoteDate, setQuoteDate] = useState("");
    const [validDate, setValidDate] = useState("");
    const [currency, setCurrency] = useState("");
    const [productList, setProductList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [quoteData, setQuoteData] = useState([]);

    useEffect(() => {
        getProductListFromFirebase();
    }, []);

    async function getProductListFromFirebase() {
        const list = await api.getCompleteCollection("products");
        setProductList(list);
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
            newQuoteProduct.currency = "";
            newData.push(newQuoteProduct);
        });
        console.log(newData);
        setQuoteData(prev => [...prev, newData].flat(1));
    }

    function handleQtyChange(index, e) {
        let data = [...quoteData];
        data[index][e.target.name] = e.target.value;
        setQuoteData(data);
    }

    function deleteProduct(itemIndex) {
        console.log(itemIndex);
        const data = quoteData.filter((_, index) => index !== itemIndex);
        setQuoteData(data);
    }

    return (
        <Container>
            <SideBar />
            <Main>
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
                        <Button onClick={() => addPorduct()}>Add</Button>
                    </Flex>
                    <Table>
                        <thead>
                            <tr>
                                <Th>產品編號</Th>
                                <Th>產品名稱</Th>
                                <Th>產品圖片</Th>
                                <Th>購買數量</Th>
                                <Th>產品單價</Th>
                                <Th>幣值</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {quoteData &&
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
                                                    handleQtyChange(index, e)
                                                }
                                                value={e.price}
                                            />
                                        </Td>
                                        <Td>
                                            <input
                                                type="text"
                                                name="currency"
                                                onChange={e =>
                                                    handleQtyChange(index, e)
                                                }
                                                value={e.currency}
                                            />
                                        </Td>
                                        <Td>
                                            <Button
                                                onClick={() => {
                                                    deleteProduct(index);
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
            </Main>
        </Container>
    );
}
export default Quote;
