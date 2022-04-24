import styled from "styled-components";
import { useEffect, useState } from "react";
import api from "../utils/firebaseApi";
import form from "../utils/formChange";

const Contanier = styled.div`
    padding: 20px 5%;
`;
const Title = styled.div`
    margin-bottom: 20px;
`;
const Table = styled.table`
    border: solid 1px #000000;
    border-radius: 10px;
    padding: 20px 5%;
    width: 100%;
    background-color: #fff;
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
    const collections = {
        customers2: [
            "客戶",
            ["客戶編號", "公司名稱", "聯繫人", "地區", "更新", "刪除"],
            ["id", "company", "contacts", "country"],
        ],
        suppliers2: [
            "廠商",
            ["廠商編號", "公司名稱", "聯繫人", "地區", "更新", "刪除"],
            ["id", "company", "contacts", "country"],
        ],
        products2: [
            "產品",
            [
                "產品編號",
                "類別",
                "系列",
                "材質",
                "色碼",
                "款式",
                "特殊",
                "備註",
                "更新",
                "刪除",
            ],
            [
                "id",
                "class",
                "group",
                "material",
                "color",
                "type",
                "special",
                "mark",
            ],
        ],
        parts2: [
            "零件",
            ["零件編號", "型號", "項目", "系列", "規格1", "規格2", "規格3"],
            ["id", "mark", "class", "group", "spec1", "spec2", "spec3"],
        ],
    };

    useEffect(() => {
        setFilterList(list);
        revisedStatusArray(list);
        setRevisedData(list);
    }, [list]);

    function handleConditionChange(e) {
        if (e === 0) {
            setFilterCondition({});
            setFilterList(list);
            revisedStatusArray(list);
            setRevisedData(list);
            return;
        }
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
            <Title>{collections[collectionName][0]}列表</Title>
            <Button
                onClick={() => {
                    handleConditionChange(0);
                }}
            >
                取消篩選
            </Button>
            <Table>
                <thead>
                    <tr>
                        {collections[collectionName][1].map((e, index) => (
                            <Th key={index}>{e}</Th>
                        ))}
                    </tr>
                    <tr>
                        {collections[collectionName][2].map(keyName => (
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
                                    {collections[collectionName][2].map(
                                        keyName => (
                                            <Td key={keyName}>{e[keyName]}</Td>
                                        ),
                                    )}
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
                                    {collections[collectionName][2].map(
                                        (keyName, keyIndex) =>
                                            keyName === "id" ||
                                            keyName === "country" ? (
                                                <Td key={keyIndex}>
                                                    {e[keyName]}
                                                </Td>
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

export default List;
