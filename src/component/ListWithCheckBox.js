import { useEffect, useState } from "react";
import { Section, Title, Table, Th, Td, Button } from "./StyleComponent";
import data from "../utils/data";

function ListWithRadio({
    collectionName,
    list,
    setProcessingData,
    processingData,
}) {
    const [filterList, setFilterList] = useState([]);
    const [filterCondition, setFilterCondition] = useState({});

    useEffect(() => {
        setFilterList(list);
    }, [list]);

    function handleConditionChange(e) {
        if (e === 0) {
            setFilterCondition({});
            setFilterList(list);
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

    function handleImportProduct(e) {
        const dataId = e.id;
        const filterData = processingData.filter(data => data.id !== dataId);
        filterData.length === processingData.length
            ? setProcessingData(prev => [...prev, e])
            : setProcessingData(filterData);
    }

    return (
        <Section>
            <Title>
                {data.listWithCheckBoxCollections[collectionName][0]}列表
            </Title>
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
                        {data.listWithCheckBoxCollections[
                            collectionName
                        ][1].map((e, index) => (
                            <Th key={index}>{e}</Th>
                        ))}
                    </tr>
                    <tr>
                        {data.listWithCheckBoxCollections[
                            collectionName
                        ][2].map(keyName => (
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
                        filterList.map((e, index) => (
                            <tr key={e.id}>
                                {data.listWithCheckBoxCollections[
                                    collectionName
                                ][2].map(keyName => (
                                    <Td key={keyName}>{e[keyName]}</Td>
                                ))}
                                <Td>
                                    <input
                                        type="checkbox"
                                        name="child"
                                        onClick={() => handleImportProduct(e)}
                                    />
                                </Td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </Section>
    );
}

export default ListWithRadio;