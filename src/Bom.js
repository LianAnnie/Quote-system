import styled from "styled-components";
import { useState, useEffect } from "react";
import SideBar from "./SideBar";
import api from "./utils/firebaseApi";
import form from "./component/formChange";

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
    const [selectedCustomer, setSelectedCustomer] = useState(0);
    // const [company, setCompany] = useState("");
    // const [contacts, setContacts] = useState("");
    // const [country, setCountry] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [customerList, setCustomerList] = useState("");
    const [customer, setCustomer] = useState({
        id: "",
        company: "",
        contacts: "",
        country: "",
    });
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
    const [newCustomer, setNewCustomer] = useState({
        id: "",
        company: "",
        contacts: "",
        country: "",
    });
    console.log(customer);

    useEffect(() => {
        getCustomerListFromFirebase();
        getPartListFromFirebase();
    }, []);

    useEffect(() => {
        console.log(typeof selectedCustomer, selectedCustomer);
        if (typeof selectedCustomer === "string") {
            addExistingCustomer();
        }
    }, [selectedCustomer]);

    async function getCustomerListFromFirebase() {
        const list = await api.getCompleteCollection("customers");
        setCustomerList(list);
        setCustomerId(form.transformId(list.length + 1, 3));
    }

    function addExistingCustomer() {
        const inquiryCustomer = customerList[selectedCustomer];
        console.log(inquiryCustomer);
        setCustomer(inquiryCustomer);
    }
    function creatNewCusomer() {
        setSelectedCustomer(0);
        const newCustomerData = newCustomer;
        newCustomerData.id = customerId;
        setNewCustomer(newCustomerData);
        setCustomer(newCustomerData);
    }
    async function getPartListFromFirebase() {
        const list = await api.getCompleteCollection("parts");
        setPartId(`${form.transformId(list.length + 1, 5)}01`);
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
        setPartId(prev => form.transformId(Number(prev) + 100, 7));
    }
    //waiting fix -> 改成客戶資料方式
    function addExistingPart() {
        const newPart = partList[selectedPart];
        const hadAddInParts = parts.find(e => e.id === selectedPart);
        if (hadAddInParts === undefined) {
            setParts(prev => [...prev, newPart]);
            return;
        }
        alert(`此零件已在列表`);
    }
    function deletePart(index) {
        const data = form.deleteProduct(index, parts);
        setParts(data);
    }
    function handlePartsChange(index, e) {
        const data = form.handleChange(index, e, parts);
        setParts(data);
    }
    function handleCustomerChange(index, e) {
        const data = form.handleChange(index, e, newCustomer);
        setNewCustomer(data);
        setCustomer(data);
    }

    function submit() {
        console.log(`${customerId}${Math.floor(Date.now() / 100000)}01`);
        const data = {
            id: `${customerId}${Math.floor(Date.now() / 100000)}01`,
            name: productName,
            inquiryQty: productQtyList,
            image: "",
            bomList: parts,
            customerId: selectedCustomer.id,
            company: selectedCustomer.company,
            country: selectedCustomer.country,
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
                            {selectedCustomer === 0 && (
                                <option value={0}>請選擇客戶</option>
                            )}
                            {customerList &&
                                customerList.map((e, index) => (
                                    <option key={e.id} value={index}>
                                        {e.company},{e.contacts}, {e.country}
                                    </option>
                                ))}
                        </select>
                        <Button
                            onClick={() => {
                                creatNewCusomer();
                            }}
                        >
                            New
                        </Button>
                    </Flex>
                    <Form>
                        <Question>
                            <div>公司編號</div>
                            <div>{customer.id}</div>
                        </Question>
                        <Question>
                            <div>公司名稱</div>
                            {selectedCustomer !== 0 ? (
                                <div>{customer.company}</div>
                            ) : (
                                <input
                                    type="text"
                                    name="company"
                                    onChange={(e, index) => {
                                        handleCustomerChange(index, e);
                                    }}
                                    value={newCustomer.company}
                                />
                            )}
                        </Question>
                        <Question>
                            <div>聯繫資料</div>
                            {selectedCustomer !== 0 ? (
                                <div>{customer.contacts}</div>
                            ) : (
                                <input
                                    type="text"
                                    name="contacts"
                                    onChange={(e, index) => {
                                        handleCustomerChange(index, e);
                                    }}
                                    value={newCustomer.contacts}
                                />
                            )}
                        </Question>
                        <Question>
                            <div>詢價國家</div>
                            {selectedCustomer !== 0 ? (
                                <div>{customer.country}</div>
                            ) : (
                                <input
                                    type="text"
                                    name="country"
                                    onChange={(e, index) => {
                                        handleCustomerChange(index, e);
                                    }}
                                    value={newCustomer.country}
                                />
                            )}
                        </Question>
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
                                parts.map((e, index) => (
                                    <tr key={e.id}>
                                        <Td>{e.id}</Td>
                                        <Td>{e.name}</Td>
                                        <Td>{e.type}</Td>
                                        <Td>{e.material}</Td>
                                        <Td>{e.finish}</Td>
                                        <Td>
                                            <input
                                                type="text"
                                                name="qty"
                                                onChange={e =>
                                                    handlePartsChange(
                                                        index,
                                                        e,
                                                        parts,
                                                    )
                                                }
                                                value={e.qty}
                                            />
                                        </Td>
                                        <Td>
                                            <input
                                                type="text"
                                                name="unit"
                                                onChange={e =>
                                                    handlePartsChange(
                                                        index,
                                                        e,
                                                        parts,
                                                    )
                                                }
                                                value={e.unit}
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
                </Parts>
                <Submit>
                    <Button onClick={() => submit()}>Submit</Button>
                </Submit>
            </Main>
        </Container>
    );
}
export default Bom;
