import { useEffect, useState } from "react";
import {
    Section,
    Title,
    Table,
    Th,
    Td,
    CancelSelectedButton,
    Flex,
    ThTitle,
    TdContext,
} from "./StyleComponent";
import data from "../utils/data";
import form from "../utils/formChange";

function ListWithRadio({
    collectionName,
    list,
    setProcessingData,
    processingData,
}) {
    const filterConditionRule = {};
    const [filterList, setFilterList] = useState([]);
    const [filterCondition, setFilterCondition] = useState({});

    useEffect(() => {
        setFilterList(list);
    }, [list]);

    function handleConditionChange(e) {
        let newFilterList;
        let name;
        let value;
        if (e === 0) {
            setFilterCondition({});
            setFilterList(list);
            return;
        }
        name = e.target.name;
        value = e.target.value;
        const newFilterCondition = filterCondition;
        newFilterCondition[name] = value;
        newFilterList = handleListChange(newFilterCondition, list);
        setFilterCondition(newFilterCondition);
        if (newFilterList.length === 0) {
            console.log(
                `沒有符合篩選結果,清除原本篩選條件,按最後一次需求篩選資料`,
            );
            const newFilterCondition = filterConditionRule;
            newFilterCondition[name] = value;
            setFilterCondition(newFilterCondition);
            const resetList = handleListChange({ [name]: value }, list);
            setFilterList(resetList);
            return;
        }
        setFilterList(newFilterList);
    }

    function handleListChange(condition, data) {
        const newFilterList = form.handleListChange(condition, data);
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
            <Flex>
                <Title>
                    {data.listWithCheckBoxCollections[collectionName][0]}列表
                </Title>
                <CancelSelectedButton
                    onClick={() => {
                        handleConditionChange(0);
                    }}
                />
            </Flex>
            <Table>
                <thead>
                    <tr>
                        {data.listWithCheckBoxCollections[
                            collectionName
                        ][1].map((e, index) => (
                            <ThTitle key={index} index={index}>
                                {e}
                            </ThTitle>
                        ))}
                        {data.listWithCheckBoxCollections.all.map(
                            (e, index) => (
                                <Th key={index}>{e}</Th>
                            ),
                        )}
                    </tr>
                    <tr>
                        {data.listWithCheckBoxCollections[
                            collectionName
                        ][2].map((keyName, indexForStyled) => (
                            <ThTitle key={keyName} index={indexForStyled}>
                                <input
                                    type="text"
                                    name={keyName}
                                    onChange={e => handleConditionChange(e)}
                                    value={list[keyName]}
                                />
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
                            </ThTitle>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filterList &&
                        filterList.map((e, index) => (
                            <tr key={e.id}>
                                {data.listWithCheckBoxCollections[
                                    collectionName
                                ][2].map((keyName, indexForStyled) => (
                                    <TdContext
                                        key={keyName}
                                        index={indexForStyled}
                                    >
                                        {e[keyName]}
                                    </TdContext>
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
