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

function List({ list, setList }) {
    const [filterList, setFilterList] = useState([]);
    const [filterCondition, setFilterCondition] = useState({});
    const [revisedStatus, setRevisedStatus] = useState([]);
    const [revisedData, setRevisedData] = useState({});
    const objectkey = ["id", "company", "contacts", "country"];

    useEffect(() => {
        setFilterList(list);
    }, [list]);

    useEffect(() => {
        if (filterList.length !== revisedStatus.length) {
            revisedStatusArray(filterList);
        }
        setRevisedData(filterList);
    }, [filterList]);

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
            setFilterList(handleListChange({ [name]: value }, list));
            return;
        }
        setFilterCondition(newFilterCondition);
        setFilterList(newFilterList);
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

    function handleRevisedStatus(e, index, save) {
        // console.log(revisedStatus,index, e);
        const newRevisedStatus = [...revisedStatus];
        const newRevisedData = [...revisedData];
        const newfilterList = [...filterList];
        if (newRevisedStatus[index]) {
            if (save) {
                newfilterList[index] = revisedData[index];
                setFilterList(newfilterList);
            } else {
                newRevisedData[index] = filterList[index];
                setRevisedData(newRevisedData);
            }
        }
        newRevisedStatus[index] = !newRevisedStatus[index];
        console.log(newRevisedStatus);
        setRevisedStatus(newRevisedStatus);
    }

    function handleRevisedData(index, e) {
        console.log(filterList);
        const data = form.handleChange(index, e, revisedData);
        setRevisedData(data);
    }

    return (
        <Contanier>
            <Title>列表</Title>
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
                        <Th>編號</Th>
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
                                                handleRevisedStatus(e, index)
                                            }
                                        >
                                            更新
                                        </Button>
                                    </Td>
                                    <Td>
                                        <Button>刪除</Button>
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
                                                handleRevisedStatus(
                                                    e,
                                                    index,
                                                    true,
                                                )
                                            }
                                        >
                                            儲存
                                        </Button>
                                    </Td>
                                    <Td>
                                        <Button
                                            onClick={() =>
                                                handleRevisedStatus(
                                                    e,
                                                    index,
                                                    true,
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

function CompaniesList({
    customerList,
    setCustomerList,
    supplierList,
    setSupplierList,
}) {
    return (
        <>
            <List list={customerList} setList={setCustomerList} />
            {/* <SupplierList
                supplierList={supplierList}
                setSupplierList={setSupplierList}
            /> */}
        </>
    );
}

export default CompaniesList;