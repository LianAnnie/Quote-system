import styled from "styled-components";
import SideBar from "./SideBar";
import api from "./utils/firebaseApi";
import { useState, useEffect } from "react";

const Container = styled.div`
    text-align: left;
`;
const Main = styled.div`
    margin-left: 300px;
    padding: 50px 2%;
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
    width: 100px;
    margin: 5px;
    text-align: center;
    cursor: pointer;
`;

function Analysis2() {
    const [productList, setProductList] = useState([]);
    const [selectedList, setSelectedList] = useState([]);
    const [importProduct, setImportProduct] = useState([]);
    console.log(importProduct);

    useEffect(() => {
        getProductListFromFirebase();
    }, []);

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

    function handleImportChange(e) {
        const targetId = e.target.value.replace(",", "").replace(",", "");
        const removeList = importProduct.filter(
            m => m.id.join("") !== targetId,
        );
        if (removeList.length < importProduct.length) {
            setImportProduct(removeList);
        } else {
            const data = selectedList.filter(
                m => m.id.join("") === targetId,
            )[0];

            setImportProduct(prev => [...prev, data]);
        }
    }

    function showAllProduceList() {
        setSelectedList(productList);
    }

    return (
        <Container>
            <SideBar />
            <Main>
                <Title>產品列表</Title>
                <Button onClick={() => showAllProduceList()}>取消篩選</Button>
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
                                            <option key={index} value={e.id[1]}>
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
                                                        .indexOf(e.country) ===
                                                    index,
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
                                                        .indexOf(e.company) ===
                                                    index,
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
                            selectedList.map(e => (
                                <tr key={e.id}>
                                    <Td>{e.id[1]}</Td>
                                    <Td>{e.id[2]}</Td>
                                    <Td>{e.country}</Td>
                                    <Td>{e.company}</Td>
                                    <Td>{e.name}</Td>
                                    <Td></Td>
                                    <Td>
                                        <input
                                            type="checkbox"
                                            value={e.id}
                                            onChange={e =>
                                                handleImportChange(e)
                                            }
                                            checked={e.checked}
                                        />
                                    </Td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </Main>
        </Container>
    );
}
export default Analysis2;
