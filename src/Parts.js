import styled from "styled-components";
import { useState, useEffect } from "react";
import SideBar from "./SideBar";
import { Timestamp } from "firebase/firestore";
import api from "./utils/firebaseApi";
import form from "./component/formChange";

const Container = styled.div`
    text-align: left;
`;
const Main = styled.div`
    margin-left: 300px;
    padding: 50px 2%;
`;
const Quote = styled.div`
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

function Parts() {
    const quoteDataRule = {
        date: "2022-04-01",
        valid: "2022-04-01",
        currency: "NT",
    };
    const supplierDataRule = {
        id: "",
        company: "",
        contacts: "",
        country: "",
    };
    const [quoteData, setQuoteData] = useState(quoteDataRule);
    const [supplierList, setSupplierList] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState(0);
    const [supplier, setSupplier] = useState(supplierDataRule);
    const [newSupplier, setNewSupplier] = useState(supplierDataRule);
    const [supplierId, setSupplierId] = useState("");
    const [productList, setProductList] = useState([]);
    const [selectedPart, setSelectedPart] = useState(0);
    const [parts, setParts] = useState([]);
    console.log(supplier);

    useEffect(() => {
        getSupplierListFromFirebase();
        getProductListFromFirebase();
    }, []);

    useEffect(() => {
        if (typeof selectedSupplier === "string") {
            addExistingSupplier();
        }
    }, [selectedSupplier]);

    async function getSupplierListFromFirebase() {
        const list = await api.getCompleteCollection("suppliers");
        setSupplierId(form.transformId(list.length + 1, 3));
        setSupplierList(list);
    }
    function addExistingSupplier() {
        const inquirySupplier = supplierList[selectedSupplier];
        setSupplier(inquirySupplier);
    }
    function createNewSupplier() {
        setSelectedSupplier(0);
        const newSupplierData = newSupplier;
        newSupplierData.id = supplierId;
        setNewSupplier(newSupplierData);
        setSupplier(newSupplierData);
    }

    async function getProductListFromFirebase() {
        const list = await api.getCompleteCollection("products");
        setProductList(list);
    }
    function addPorduct() {
        let inquiryQtyArray = productList
            .filter(product =>
                product.bomList.some(part => part.id === selectedPart),
            )
            .map(e => e.inquiryQty);
        inquiryQtyArray = [...new Set(inquiryQtyArray.flat(1))];
        inquiryQtyArray.sort(function (a, b) {
            return a - b;
        });

        const part = productList
            .map(product =>
                product.bomList.find(part => part.id === selectedPart),
            )
            .filter(e => e !== undefined)[0];
        console.log(part);

        const newParts = [];
        inquiryQtyArray.forEach(qty => {
            const newpart = JSON.parse(JSON.stringify(part));
            //wait check : 這樣做數量才會變化？
            newpart.qty = qty;
            newpart.price = 0;
            newpart.leadTime = 30;
            console.log(newpart);
            newParts.push(newpart);
        });
        setParts(prev => [...prev, newParts].flat(1));
    }
    function deletePart(itemIndex) {
        const newPart = parts.filter((_, index) => index !== itemIndex);
        setParts(newPart);
    }
    function handleQuoteDataChange(e) {
        const data = form.handleChange("_", e, quoteData);
        setQuoteData(data);
    }
    function handleSupplierChange(e) {
        const data = form.handleChange("_", e, supplier);
        setNewSupplier(data);
        setSupplier(data);
    }
    function handlePartsChange(index, e) {
        console.log(index);
        const data = form.handleChange(index, e, parts);
        setParts(data);
    }
    function submit() {
        const newParts = JSON.parse(JSON.stringify(parts));
        // waiting check : 有無必要這樣做？
        let i = 0;
        console.log(quoteData);
        newParts.forEach(e => {
            const id = [e.id, supplier.id, `${Date.now()}${i}`];
            e.id = id;
            e.company = supplier.company;
            e.currency = quoteData.currency;
            e.date = new Timestamp(
                new Date(quoteData.date).getTime() / 1000,
                0,
            );
            e.valid = new Timestamp(
                new Date(quoteData.valid).getTime() / 1000,
                0,
            );
            e.price = Number(e.price);
            console.log(e);
            api.setDocWithId("partQuotations", id.join(""), e);
            i++;
        });
        setParts([]);
    }

    return (
        <Container>
            <SideBar />
            <Main>
                <Quote>
                    <Title>供應商報價</Title>
                    <Form>
                        <Question>
                            <div>報價日期</div>
                            <input
                                type="date"
                                name="date"
                                onChange={e => {
                                    handleQuoteDataChange(e);
                                }}
                                value={quoteData.date}
                            />
                        </Question>
                        <Question>
                            <div>有效日期</div>
                            <input
                                type="date"
                                name="valid"
                                onChange={e => {
                                    handleQuoteDataChange(e);
                                }}
                                value={quoteData.valid}
                            />
                        </Question>
                        <Question>
                            <div>報價幣別</div>
                            <input
                                type="input"
                                name="currency"
                                onChange={e => {
                                    handleQuoteDataChange(e);
                                }}
                                value={quoteData.currency}
                            />
                        </Question>
                    </Form>
                </Quote>
                <Suppliers>
                    <Title>供應商資料表</Title>
                    <Flex>
                        <select
                            onChange={e => setSelectedSupplier(e.target.value)}
                            value={selectedSupplier}
                        >
                            {supplierList &&
                                supplierList.map((supplier, index) => (
                                    <option key={supplier.id} value={index}>
                                        {supplier.country},{supplier.company},
                                        {supplier.contacts}
                                    </option>
                                ))}
                        </select>
                        <Button
                            onClick={() => {
                                createNewSupplier();
                            }}
                        >
                            New
                        </Button>
                    </Flex>
                    <Form>
                        <Question>
                            <div>廠商編號</div>
                            <div>{supplier.id}</div>
                        </Question>
                        <Question>
                            <div>公司名稱</div>
                            {selectedSupplier === 0 ? (
                                <input
                                    type="text"
                                    name="company"
                                    onChange={e => {
                                        handleSupplierChange(e);
                                    }}
                                    value={supplier.company}
                                />
                            ) : (
                                <div>{supplier.company}</div>
                            )}
                        </Question>
                        <Question>
                            <div>聯繫人員</div>
                            {selectedSupplier === 0 ? (
                                <input
                                    type="text"
                                    name="contacts"
                                    onChange={e => {
                                        handleSupplierChange(e);
                                    }}
                                    value={supplier.contacts}
                                />
                            ) : (
                                <div>{supplier.contacts}</div>
                            )}
                        </Question>
                        <Question>
                            <div>供應國家</div>
                            {selectedSupplier === 0 ? (
                                <input
                                    type="text"
                                    name="country"
                                    onChange={e => {
                                        handleSupplierChange(e);
                                    }}
                                    value={supplier.country}
                                />
                            ) : (
                                <div>{supplier.country}</div>
                            )}
                        </Question>
                    </Form>
                </Suppliers>
                <PartQuote>
                    <Title>零件報價明細</Title>
                    <Flex>
                        <select
                            onChange={e => setSelectedPart(e.target.value)}
                            value={selectedPart}
                        >
                            {productList &&
                                productList.map(e => (
                                    <optgroup key={e.id} label={e.name}>
                                        {e.bomList.map(p => (
                                            <option key={p.id} value={p.id}>
                                                {p.name}
                                            </option>
                                        ))}
                                    </optgroup>
                                ))}
                        </select>
                        <Button onClick={() => addPorduct()}>Add</Button>
                    </Flex>
                    <Table>
                        <thead>
                            <tr>
                                <Th>零件編號</Th>
                                <Th>零件名稱</Th>
                                <Th>處理工藝</Th>
                                <Th>零件材質</Th>
                                <Th>表面處理</Th>
                                <Th>報價數量</Th>
                                <Th>零件單位</Th>
                                <Th>零件單價</Th>
                                <Th>零件交期</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {parts &&
                                parts.map((e, index) => (
                                    <tr key={index}>
                                        <Td>{e.id}</Td>
                                        <Td>{e.name}</Td>
                                        <Td>{e.type}</Td>
                                        <Td>{e.material}</Td>
                                        <Td>{e.finish}</Td>
                                        <Td>{e.qty}</Td>
                                        <Td>{e.unit}</Td>
                                        <Td>
                                            <input
                                                type="text"
                                                name="price"
                                                onChange={e =>
                                                    handlePartsChange(index, e)
                                                }
                                                value={e.price}
                                            />
                                        </Td>
                                        <Td>
                                            <input
                                                type="text"
                                                name="leadTime"
                                                onChange={e =>
                                                    handlePartsChange(index, e)
                                                }
                                                value={e.leadTime}
                                            />
                                        </Td>
                                        <Td>
                                            <Button
                                                onClick={() => {
                                                    deletePart(index);
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </Td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </PartQuote>
                <Submit>
                    <Button onClick={() => submit()}>Submit</Button>
                </Submit>
            </Main>
        </Container>
    );
}

export default Parts;
