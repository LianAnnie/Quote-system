import styled from "styled-components";
import { useState, useEffect } from "react";
import api from "../utils/firebaseApi";
import { db } from "../utils/firebase";
import { query, collection, where, getDocs } from "firebase/firestore";

const Products = styled.div`
    padding: 20px 10%;
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
    width: 150px;
    margin: 5px;
    text-align: center;
    cursor: pointer;
`;

function List({
    productList,
    setPartQuotationsData,
    setCaculatedData,
    setSelectedProduct,
    setSumCost,
    setPieData,
    setProductList,
    selectedList,
    setSelectedList,
}) {
    // const { selectedList, setSelectedList } = useState([]);

    useEffect(() => {
        getProductListFromFirebase();
    }, []);

    function showAllProduceList() {
        setSelectedList(productList);
    }
    function handleListChange(e) {
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
    async function getPartsQtationsFromFireBase(partIdList) {
        const quotationDataPromise = partIdList.map(async e => {
            const q = query(
                collection(db, "partQuotations"),
                where("id", "array-contains", e),
            );
            const data = await getDocs(q);
            const promiseData = data.docs.map(e => e.data());
            return promiseData;
        });

        const quotationData = await Promise.all(quotationDataPromise);
        return quotationData;
    }
    function changeSelectedProductToRander(data) {
        console.log(data);
        const analysisList = data.bomList.map(e => {
            const partUseage = {
                qty: Number(e.qty),
                quoteId: e.id,
            };
            return partUseage;
        });
        console.log(analysisList);
        const newArray = data.inquiryQty.map(e => {
            const renderData = {
                id: data.id,
                qty: e,
                company: data.company,
                country: data.country,
                name: data.name,
                price: 0,
                margin: 1,
                currency: "",
                analysisList,
                leadTime: 30,
            };
            return renderData;
        });
        return newArray;
    }
    async function handleProductChange(data) {
        setPartQuotationsData([]);
        setCaculatedData([]);
        // console.log(data);
        const renderProductData = changeSelectedProductToRander(data);
        // console.log(renderProductData);
        setSelectedProduct(renderProductData);
        // setPartQuotationsData(renderProductData);
        const partIdList = data.bomList.map(e => e.id);
        const quotationData = await getPartsQtationsFromFireBase(partIdList);
        console.log(quotationData);
        const newCaculateData = quotationData.map(e => (e[0] ? e[0] : []));
        console.log(newCaculateData);
        const usageList = data.bomList?.map(e => Number(e.qty));
        // console.log(usageList);

        const sum = newCaculateData
            .map(e => e.price)
            .reduce((sum1, m, index) => sum1 + m * usageList[index], 0);

        // console.log(newCaculateData);
        // console.log(sum, typeof sum);

        setSumCost(isNaN(sum) ? 0 : sum);
        getPieData(newCaculateData, sum);

        setCaculatedData(newCaculateData);
        setPartQuotationsData(quotationData);
    }

    function getPieData(data, totalPrice) {
        const getDataArray = data.map(e => [
            e.name,
            Math.floor((e.price / totalPrice) * 100),
        ]);
        setPieData(getDataArray);
    }

    async function getProductListFromFirebase() {
        const list = await api.getCompleteCollection("products");
        // console.table(list);
        setProductList(list);
        setSelectedList(list);
    }

    return (
        <Products>
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
                                                    .indexOf(e.name) === index,
                                        )
                                        .map((j, index) => (
                                            <option key={index} value={j.name}>
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
                                                    .indexOf(m.id) === index,
                                        )
                                        .map((p, index2) => (
                                            <option key={index2} value={p.id}>
                                                {p.name}
                                            </option>
                                        ))}
                            </select>
                        </Th>
                    </tr>
                </thead>
                <tbody>
                    {selectedList &&
                        selectedList.map((e, index) => (
                            <tr key={index}>
                                <Td>{e.id[1]}</Td>
                                <Td>{e.id[2]}</Td>
                                <Td>{e.country}</Td>
                                <Td>{e.company}</Td>
                                <Td>{e.name}</Td>
                                <Td></Td>
                                <Td>
                                    <input
                                        type="radio"
                                        name="product"
                                        onClick={() => handleProductChange(e)}
                                    />
                                </Td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </Products>
    );
}

export default List;
