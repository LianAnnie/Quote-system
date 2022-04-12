import styled from "styled-components";
import { useState, useEffect } from "react";
import SideBar from "./SideBar";
import db from "./utils/firebase";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";

const Container = styled.div`
    text-align: left;
`;
const Main = styled.div`
    margin-left: 300px;
    padding: 50px 10%;
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
    width: 55px;
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

function Supplier() {
    const [quoteDate, setQuoteDate] = useState("");
    const [validDate, setValidDate] = useState("");
    const [supplierList, setSupplierList] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState(0);
    const [company, setCompany] = useState("");
    const [contacts, setContacts] = useState("");
    const [country, setCountry] = useState("");
    const [supplierId, setSupplierId] = useState("");
    const [productList, setProductList] = useState([]);
    const [selectedPart, setSelectedPart] = useState("");
    const [parts, setParts] = useState([]);
    console.log(
        `selectedSupplier value = ${selectedSupplier} = 在supplierList位置`,
    );
    //waiting fix : Bom.js 是否也要這樣寫？
    console.log(parts);

    useEffect(() => {
        getSupplierListFromFirebase();
        getProductListFromFirebase();
    }, []);

    function transformId(id, number) {
        if (id.length === number) return id;
        else return id.toString().padStart(number, 0);
    }
    async function getSupplierListFromFirebase() {
        const collectionRef = collection(db, "suppliers");
        const collectionData = await getDocs(collectionRef);
        const list = collectionData.docs.map(e => e.data());
        setSupplierId(transformId(list.length + 1, 3));
        setSupplierList(list);
    }
    function addExistingSupplier() {
        setCompany(supplierList[selectedSupplier].company);
        setContacts(supplierList[selectedSupplier].contacts);
        setCountry(supplierList[selectedSupplier].country);
    }
    async function addSupplierToFirebase() {
        const supplierData = {
            id: supplierId,
            company,
            contacts,
            country,
        };
        console.log(supplierData);
        setDoc(doc(db, "suppliers", supplierId), supplierData);
        setCompany("");
        setContacts("");
        setCountry("");
    }
    async function getProductListFromFirebase() {
        const collectionRef = collection(db, "products");
        const collectionData = await getDocs(collectionRef);
        const list = collectionData.docs.map(e => e.data());
        setProductList(list);
    }
    function addPorduct() {
        let inquiryQtyArray = [];
        productList
            .filter(product =>
                product.bomList.some(part => part.id === selectedPart),
            )
            .map(e => inquiryQtyArray.push(e.inquiryQty));
        inquiryQtyArray = [...new Set(inquiryQtyArray.flat(1))];
        console.log(inquiryQtyArray);

        const part = productList
            .map(product =>
                product.bomList.find(part => part.id === selectedPart),
            )
            .filter(e => e !== undefined)[0];

        let parts = [];

        setParts(prev => [...prev, part]);
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
                        <Button onClick={() => addExistingSupplier()}>
                            Add
                        </Button>
                    </Flex>
                    <Form>
                        <Question>
                            <div>公司名稱</div>
                            <input
                                type="text"
                                onChange={e => {
                                    setCompany(e.target.value);
                                }}
                                value={company}
                            />
                        </Question>
                        <Question>
                            <div>聯繫人員</div>
                            <input
                                type="text"
                                onChange={e => {
                                    setContacts(e.target.value);
                                }}
                                value={contacts}
                            />
                        </Question>
                        <Question>
                            <div>供應國家</div>
                            <input
                                type="text"
                                onChange={e => {
                                    setCountry(e.target.value);
                                }}
                                value={country}
                            />
                        </Question>
                        <Button
                            onClick={() => {
                                addSupplierToFirebase();
                            }}
                        >
                            New
                        </Button>
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
                                <Th>零件單價</Th>
                                <Th>零件單位</Th>
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
                                        <Td>
                                            {/* <Button
                                                onClick={() => {
                                                    deletePart(e.id)
                                                }}
                                            >
                                                Delete
                                            </Button> */}
                                        </Td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </PartQuote>
                <Submit>
                    {/* <Button onClick={() => submit()}>Submit</Button> */}
                </Submit>
            </Main>
        </Container>
    );
}

export default Supplier;
