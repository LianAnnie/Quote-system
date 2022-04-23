import styled from "styled-components";
import { useEffect, useState } from "react";
import api from "../utils/firebaseApi";
import form from "../utils/formChange";

const Contanier = styled.div`
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
    width: 100px;
    margin: 5px;
    text-align: center;
    cursor: pointer;
`;

function List({ collectionName, list }) {
    const [filterList, setFilterList] = useState([]);
    const [filterCondition, setFilterCondition] = useState({});
    const [revisedStatus, setRevisedStatus] = useState([]);
    const [revisedData, setRevisedData] = useState({});
    const objectkey = ["id", "company", "contacts", "country"];
    const collections = {
        customers2: "客戶",
        suppliers2: "供應商",
    };

    useEffect(() => {
        setFilterList(list);
        revisedStatusArray(list);
        setRevisedData(list);
    }, [list]);

    function handleConditionChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name, value);
        console.log(filterCondition[name]);
        const newFilterCondition = JSON.parse(JSON.stringify(filterCondition));
        newFilterCondition[name] = value;
        const newFilterList = handleListChange(newFilterCondition, filterList);
        if (newFilterList.length === 0) {
            console.log(
                `沒有符合篩選結果,清除原本篩選條件,按最後一次需求篩選資料`,
            );
            setFilterCondition({ [name]: value });
            const resetList = handleListChange({ [name]: value }, list);
            setFilterList(resetList);
            revisedStatusArray(resetList);
            setRevisedData(resetList);
            return;
        }
        setFilterCondition(newFilterCondition);
        setFilterList(newFilterList);
        revisedStatusArray(newFilterList);
        setRevisedData(newFilterList);
    }

    function handleListChange(condition, data) {
        const filterKeyArray = Object.keys(condition);
        let copyFilterList = [...data];
        const newFilterList = copyFilterList.filter(
            m =>
                !filterKeyArray
                    .map(key =>
                        key === "id"
                            ? m[key].join("") === condition[key]
                            : m[key] === condition[key],
                    )
                    .some(e => !e),
        );
        return newFilterList;
    }

    function revisedStatusArray(filterList) {
        const length = filterList.length;
        const newArray = new Array(length).fill(false);
        setRevisedStatus(newArray);
    }

    function handleRevisedStatus(index, save) {
        // console.log(revisedStatus,index, e);
        const newRevisedStatus = [...revisedStatus];
        const newRevisedData = [...revisedData];
        const newfilterList = [...filterList];
        if (newRevisedStatus[index]) {
            if (save) {
                console.log(save);
                newfilterList[index] = revisedData[index];
                api.updateDoc(
                    collectionName,
                    revisedData[index].id.join(""),
                    revisedData[index],
                );
                setFilterList(newfilterList);
            } else {
                console.log(save);
                newRevisedData[index] = filterList[index];
                setRevisedData(newRevisedData);
            }
        }
        newRevisedStatus[index] = !newRevisedStatus[index];
        setRevisedStatus(newRevisedStatus);
    }

    function handleRevisedData(index, e) {
        console.log(filterList);
        const data = form.handleChange(index, e, revisedData);
        setRevisedData(data);
    }

    function deleteData(itemIndex) {
        const deleteData = filterList[itemIndex];
        const newFilterList = filterList.filter(
            (_, index) => index !== itemIndex,
        );
        api.deleteDoc(collectionName, deleteData.id.join(""));
        setFilterList(newFilterList);
    }

    console.log(list);

    return (
        <Contanier>
            <Title>{collections[collectionName]}列表</Title>
            <Button
                onClick={() => {
                    handleListChange(0);
                }}
            >
                取消篩選
            </Button>
            <Table>
                <thead>
                    <tr>
                        <Th>{collections[collectionName]}編號</Th>
                        <Th>公司名稱</Th>
                        <Th>聯繫人</Th>
                        <Th>國家</Th>
                        <Th>更新</Th>
                        <Th>刪除</Th>
                    </tr>
                    <tr>
                        {objectkey.map(keyName => (
                            <Th key={keyName}>
                                <select
                                    name={keyName}
                                    onChange={e => handleConditionChange(e)}
                                    value={list[keyName]}
                                >
                                    {list
                                        .filter(
                                            (m, index, array) =>
                                                array
                                                    .map(n => n[keyName])
                                                    .indexOf(m[keyName]) ===
                                                index,
                                        )
                                        .map((o, index) => (
                                            <option key={index}>
                                                {o[keyName]}
                                            </option>
                                        ))}
                                </select>
                            </Th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filterList &&
                        filterList.map((e, index) =>
                            !revisedStatus[index] ? (
                                <tr key={e.id}>
                                    {objectkey.map(keyName => (
                                        <Td key={keyName}>{e[keyName]}</Td>
                                    ))}
                                    <Td>
                                        <Button
                                            onClick={() =>
                                                handleRevisedStatus(index)
                                            }
                                        >
                                            更新
                                        </Button>
                                    </Td>
                                    <Td>
                                        <Button
                                            onClick={() => deleteData(index)}
                                        >
                                            刪除
                                        </Button>
                                    </Td>
                                </tr>
                            ) : (
                                <tr key={e.id}>
                                    {objectkey.map((keyName, keyIndex) =>
                                        keyName === "id" ||
                                        keyName === "country" ? (
                                            <Td key={keyIndex}>{e[keyName]}</Td>
                                        ) : (
                                            <Td>
                                                <input
                                                    key={keyIndex}
                                                    name={keyName}
                                                    value={
                                                        revisedData[index][
                                                            keyName
                                                        ]
                                                    }
                                                    onChange={e =>
                                                        handleRevisedData(
                                                            index,
                                                            e,
                                                        )
                                                    }
                                                ></input>
                                            </Td>
                                        ),
                                    )}
                                    <Td>
                                        <Button
                                            onClick={() =>
                                                handleRevisedStatus(index, true)
                                            }
                                        >
                                            儲存
                                        </Button>
                                    </Td>
                                    <Td>
                                        <Button
                                            onClick={() =>
                                                handleRevisedStatus(
                                                    index,
                                                    false,
                                                )
                                            }
                                        >
                                            取消
                                        </Button>
                                    </Td>
                                </tr>
                            ),
                        )}
                </tbody>
            </Table>
        </Contanier>
    );
}

// function SupplierList({ supplierList, setSupplierList }) {}

function CompaniesList({ customerList, supplierList }) {
    return (
        <>
            <List collectionName={"customers2"} list={customerList} />
            <List collectionName={"suppliers2"} list={supplierList} />
        </>
    );
}

export default CompaniesList;
