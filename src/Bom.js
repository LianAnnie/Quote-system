import styled from "styled-components";
import { useState, useEffect } from "react";
import SideBar from "./SideBar";
import api from "./utils/firebaseApi";

const Container = styled.div`
    text-align: left;
`;
const Main = styled.div`
    margin-left: 300px;
    padding: 50px 10%;
`;
const Product = styled.div`
    padding: 20px 10%;
`;
const Customers = styled.div`
    padding: 20px 10%;
`;
const Part = styled.div`
    padding: 20px 10%;
`;
const Parts = styled.div`
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
    width: 100px;
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

function Bom() {
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [company, setCompany] = useState("");
    const [contacts, setContacts] = useState("");
    const [country, setCountry] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [customerList, setCustomerList] = useState("");
    const [productName, setProductName] = useState("");
    const [productQty, setProductQty] = useState("");
    const [productQtyList, setProductQtyList] = useState([]);
    const [partId, setPartId] = useState("");
    const [partName, setPartName] = useState("");
    const [partType, setPartType] = useState("");
    const [partMaterial, setPartMaterial] = useState("");
    const [partFinish, setPartFinish] = useState("");
    const [partList, setPartList] = useState([]);
    const [selectedPart, setSelectedPart] = useState("");
    const [parts, setParts] = useState([]);
    console.log(parts);

    useEffect(() => {
        getCustomerListFromFirebase();
        getPartListFromFirebase();
    }, []);
    function transformId(id, number) {
        if (id.length === number) return id;
        else return id.toString().padStart(number, 0);
    }

    async function getCustomerListFromFirebase() {
        const list = await api.getCompleteCollection("customers");
        setCustomerList(list);
        setCustomerId(transformId(list.length + 1, 3));
    }

    function addExistingCustomer() {
        const inquiryCustomer = customerList.filter(
            e => e.id === selectedCustomer,
        );
        setSelectedCustomer(inquiryCustomer);
        setCompany(inquiryCustomer[0].company);
        setContacts(inquiryCustomer[0].contacts);
        setCountry(inquiryCustomer[0].country);
    }

    async function addCustomerToFirebase() {
        const customerData = {
            id: customerId,
            company,
            contacts,
            country,
        };
        api.setDocWithId("customers", customerId, customerData);
        setCompany("");
        setContacts("");
        setCountry("");
    }
    async function getPartListFromFirebase() {
        const list = await api.getCompleteCollection("parts");
        setPartId(`${transformId(list.length + 1, 5)}01`);
        setPartList(list);
    }
    async function addPartToFirebase() {
        const data = {
            id: partId,
            name: partName,
            type: partType,
            material: partMaterial,
            finish: partFinish,
        };
        console.log(data);
        api.setDocWithId("parts", partId, data);
        setPartName("");
        setPartType("");
        setPartMaterial("");
        setPartFinish("");
        data.qty = 1;
        data.unit = "pcs";
        setParts(prev => [...prev, data]);
        setPartId(prev => transformId(Number(prev) + 100, 7));
    }
    function addExistingPart() {
        const newPart = partList[selectedPart];
        const hadAddInParts = parts.find(e => e.id === selectedPart);
        if (hadAddInParts === undefined) {
            setParts(prev => [...prev, newPart]);
            return;
        }
        alert(`此零件已在列表`);
    }
    function deletePart(id) {
        const newPart = parts.filter(e => e.id !== id);
        setParts(newPart);
    }

    function reduceQty(id) {
        const newParts = [];
        parts.forEach(e => {
            if (e.id === id) {
                e.qty -= 1;
            }
            newParts.push(e);
        });
        setParts(newParts);
    }

    function addQty(id) {
        const newParts = [];
        parts.forEach(e => {
            if (e.id === id) {
                e.qty += 1;
            }
            newParts.push(e);
        });
        setParts(newParts);
    }

    function submit() {
        console.log(`${customerId}${Math.floor(Date.now() / 100000)}01`);
        const data = {
            id: `${customerId}${Math.floor(Date.now() / 100000)}01`,
            name: productName,
            inquiryQty: productQtyList,
            image: "",
            bomList: parts,
            customerId: selectedCustomer[0].id,
            company: selectedCustomer[0].company,
            country: selectedCustomer[0].country,
        };
        console.log(data);
        api.setDocWithId(
            "products",
            `${customerId}${Math.floor(Date.now() / 100000)}01`,
            data,
        );
    }

    return (
        <Container>
            <SideBar />
            <Main>
                <Product>
                    <Title>產品結構表</Title>
                    <Form>
                        <Question>
                            <div>產品名稱</div>
                            <input
                                type="text"
                                onChange={e => {
                                    setProductName(e.target.value);
                                }}
                                value={productName}
                            />
                        </Question>
                        <Question>
                            <div>詢價數量</div>
                            <div>{productQtyList.map(e => `${e},`)}</div>
                            <input
                                type="text"
                                onChange={e => {
                                    setProductQty(Number(e.target.value));
                                }}
                                value={productQty}
                            />
                            <Button
                                onClick={() => {
                                    setProductQtyList(prev => [
                                        ...prev,
                                        productQty,
                                    ]);
                                }}
                            >
                                加入
                            </Button>
                        </Question>
                    </Form>
                </Product>
                <Customers>
                    <Title>客戶資料表</Title>
                    <Flex>
                        <select
                            onChange={e => setSelectedCustomer(e.target.value)}
                            value={selectedCustomer}
                        >
                            {customerList &&
                                customerList.map(customer => (
                                    <option
                                        key={customer.id}
                                        value={customer.id}
                                    >
                                        {customer.company},{customer.contacts},{" "}
                                        {customer.country}
                                    </option>
                                ))}
                        </select>
                        <Button onClick={() => addExistingCustomer()}>
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
                            <div>聯繫資料</div>
                            <input
                                type="text"
                                onChange={e => {
                                    setContacts(e.target.value);
                                }}
                                value={contacts}
                            />
                        </Question>
                        <Question>
                            <div>詢價國家</div>
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
                                addCustomerToFirebase();
                            }}
                        >
                            New
                        </Button>
                    </Form>
                </Customers>
                <Part>
                    <Title>新增零件</Title>
                    <Form>
                        <Question>
                            <div>零件編號</div>
                            <div>{partId}</div>
                        </Question>
                        <Question>
                            <div>零件名稱</div>
                            <input
                                type="text"
                                onChange={e => {
                                    setPartName(e.target.value);
                                }}
                                value={partName}
                            />
                        </Question>
                        <Question>
                            <div>處理工藝</div>
                            <input
                                type="text"
                                onChange={e => {
                                    setPartType(e.target.value);
                                }}
                                value={partType}
                            />
                        </Question>
                        <Question>
                            <div>材質型號</div>
                            <input
                                type="text"
                                onChange={e => {
                                    setPartMaterial(e.target.value);
                                }}
                                value={partMaterial}
                            />
                        </Question>
                        <Question>
                            <div>表面外觀</div>
                            <input
                                type="text"
                                onChange={e => {
                                    setPartFinish(e.target.value);
                                }}
                                value={partFinish}
                            />
                        </Question>
                        <Button
                            onClick={() => {
                                addPartToFirebase();
                            }}
                        >
                            New
                        </Button>
                    </Form>
                </Part>
                <Parts>
                    <Title>零件表</Title>
                    <Flex>
                        <select
                            onChange={e => setSelectedPart(e.target.value)}
                            value={selectedPart}
                        >
                            {partList &&
                                partList.map((e, index) => (
                                    <option key={e.id} value={index}>
                                        {e.name},{e.type},{e.material},
                                        {e.finish}
                                    </option>
                                ))}
                        </select>
                        <Button onClick={() => addExistingPart()}>Add</Button>
                    </Flex>
                    <Table>
                        <thead>
                            <tr>
                                <Th>零件編號</Th>
                                <Th>零件名稱</Th>
                                <Th>處理工藝</Th>
                                <Th>零件材質</Th>
                                <Th>表面處理</Th>
                                <Th>使用數量</Th>
                                <Th>計算單位</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {parts &&
                                parts.map(e => (
                                    <tr key={e.id}>
                                        <Td>{e.id}</Td>
                                        <Td>{e.name}</Td>
                                        <Td>{e.type}</Td>
                                        <Td>{e.material}</Td>
                                        <Td>{e.finish}</Td>
                                        <Td>{e.qty}</Td>
                                        <Td>{e.unit}</Td>
                                        <Td>
                                            <Button
                                                onClick={() => {
                                                    reduceQty(e.id);
                                                }}
                                            >
                                                Reduce Qty
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    addQty(e.id);
                                                }}
                                            >
                                                Add Qty
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    deletePart(e.id);
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </Td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </Parts>
                <Submit>
                    <Button onClick={() => submit()}>Submit</Button>
                </Submit>
            </Main>
        </Container>
    );
}
export default Bom;
