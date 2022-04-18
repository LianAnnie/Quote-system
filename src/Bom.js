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
    const customerDataRule = {
        id: "",
        company: "",
        contacts: "",
        country: "",
    };
    const partDataRule = {
        id: "",
        name: "",
        type: "",
        material: "",
        finish: "",
    };
    const [selectedCustomer, setSelectedCustomer] = useState(0);
    const [customerId, setCustomerId] = useState("");
    const [customerList, setCustomerList] = useState("");
    const [customer, setCustomer] = useState(customerDataRule);
    const [newCustomer, setNewCustomer] = useState(customerDataRule);
    const [newPart, setNewPart] = useState(partDataRule);
    const [productName, setProductName] = useState("");
    const [productQty, setProductQty] = useState("");
    const [productQtyList, setProductQtyList] = useState([]);
    const [partList, setPartList] = useState([]);
    const [selectedPart, setSelectedPart] = useState("");
    const [parts, setParts] = useState([]);

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
        setPartList(list);
    }
    function creatNewPart() {
        const data = JSON.parse(JSON.stringify(newPart));
        //waiting check : 加了這句,原本object才沒有被改變
        const maxId = form.getMaxId(partList, 0, 5);
        const maxIdToString = `${form.transformId(maxId + 1, 5)}01`;
        data.id = maxIdToString;
        setNewPart(data);
    }
    function creatNewPartFromExisting() {
        const existingPart = partList[selectedPart];
        setNewPart(existingPart);
    }
    async function addPartToFirebase() {
        const hadExisitingInParts = partList.find(e => e.id === newPart.id);
        if (hadExisitingInParts === undefined) {
            console.log(newPart.id, newPart);
            api.setDocWithId("parts", newPart.id, newPart);
            setParts(prev => [...prev, newPart]);
            getPartListFromFirebase();
            setNewPart(partDataRule);
            return;
        }
        const partIdWithoutVersionNumber = newPart.id.substring(0, 5);
        const samePartList = partList.filter(
            e => e.id.includes(partIdWithoutVersionNumber) && e,
        );
        const currentMaxNumber = form.getMaxId(samePartList, 6, 7);
        alert(`現有零件編號重複了,改款版本號請編寫${currentMaxNumber + 1}`);
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
    function deletePart(index) {
        const data = form.deleteProduct(index, parts);
        setParts(data);
    }
    function handlePartsChange(index, e) {
        const data = form.handleChange(index, e, parts);
        setParts(data);
    }
    function handlePartChange(index, e) {
        const data = form.handleChange(index, e, newPart);
        setNewPart(data);
    }
    function handleCustomerChange(index, e) {
        const data = form.handleChange(index, e, newCustomer);
        setNewCustomer(data);
        setCustomer(data);
    }
    function submit() {
        const id = [customer.id, Math.floor(Date.now()), "01"];
        const data = {
            id,
            //waiting add: 要加入現有產品版本考慮
            name: productName,
            inquiryQty: productQtyList.sort(function (a, b) {
                return a - b;
            }),
            image: "",
            //waiting add: 要加入放圖片的功能
            bomList: parts,
            company: customer.company,
            country: customer.country,
        };
        console.log(data);
        api.setDocWithId("products", id.join(""), data);
        if (selectedCustomer === 0) {
            api.setDocWithId("customers", customer.id, customer);
        }
        setParts([]);
        setProductName("");
        setProductQty("");
        setProductQtyList([]);
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
                    <Title>零件表</Title>
                    <Flex>
                        <select
                            onChange={e => setSelectedPart(e.target.value)}
                            value={selectedPart}
                        >
                            {partList &&
                                partList.map((e, index) => (
                                    <option key={e.id} value={index}>
                                        {e.id}-{e.name},{e.type},{e.material},
                                        {e.finish}
                                    </option>
                                ))}
                        </select>
                        <Button
                            onClick={() => {
                                creatNewPartFromExisting();
                            }}
                        >
                            改款
                        </Button>
                        <Button
                            onClick={() => {
                                creatNewPart();
                            }}
                        >
                            新增
                        </Button>
                        <Button onClick={() => addExistingPart()}>Add</Button>
                    </Flex>
                    {newPart.id !== "" && (
                        <Form>
                            <Question>
                                <div>零件編號</div>
                                <input
                                    type="text"
                                    name="id"
                                    onChange={(e, index) => {
                                        handlePartChange(index, e);
                                    }}
                                    value={newPart.id}
                                />
                            </Question>
                            <Question>
                                <div>零件名稱</div>
                                <input
                                    type="text"
                                    name="name"
                                    onChange={(e, index) => {
                                        handlePartChange(index, e);
                                    }}
                                    value={newPart.name}
                                />
                            </Question>
                            <Question>
                                <div>處理工藝</div>
                                <input
                                    type="text"
                                    name="type"
                                    onChange={(e, index) => {
                                        handlePartChange(index, e);
                                    }}
                                    value={newPart.type}
                                />
                            </Question>
                            <Question>
                                <div>材質型號</div>
                                <input
                                    type="text"
                                    name="material"
                                    onChange={(e, index) => {
                                        handlePartChange(index, e);
                                    }}
                                    value={newPart.material}
                                />
                            </Question>
                            <Question>
                                <div>表面外觀</div>
                                <input
                                    type="text"
                                    name="finish"
                                    onChange={(e, index) => {
                                        handlePartChange(index, e);
                                    }}
                                    value={newPart.finish}
                                />
                            </Question>
                            <Button
                                onClick={() => {
                                    addPartToFirebase();
                                }}
                            >
                                Add
                            </Button>
                        </Form>
                    )}
                </Part>
                <Parts>
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
