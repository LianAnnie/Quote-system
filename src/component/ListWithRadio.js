import { useEffect, useState } from "react";
import {
    Section,
    Title,
    AddScrollbar,
    Table,
    Th,
    Td,
    CancelSelectedButton,
    Flex,
    ThTitle,
    TdContext,
    SelectInput,
    SelectStyled,
} from "./StyleComponent";
import data from "../utils/data";
import form from "../utils/formChange";

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
        const newFilterList = form.handleListChange(condition, data);
        return newFilterList;
    }

    function handleImportProduct(e) {
        setProcessingData(e);
    }

    return (
        <Section>
            <Flex>
                <Title>{data.listCollections[collectionName][0]}列表</Title>
                <CancelSelectedButton
                    onClick={() => {
                        handleConditionChange(0);
                    }}
                />
            </Flex>
            <AddScrollbar>
                <Table>
                    <thead>
                        <tr>
                            {data.listCollections[collectionName][1].map(
                                (e, index) => (
                                    <ThTitle key={index} index={index}>
                                        {e}
                                    </ThTitle>
                                ),
                            )}
                            {data.listCollections.select.map((e, index) => (
                                <Th key={index}>{e}</Th>
                            ))}
                        </tr>
                        <tr>
                            {data.listCollections[collectionName][2].map(
                                (keyName, indexForStyled) => (
                                    <ThTitle
                                        key={keyName}
                                        index={indexForStyled}
                                    >
                                        <SelectInput
                                            type="text"
                                            name={keyName}
                                            onChange={e =>
                                                handleConditionChange(e)
                                            }
                                            value={list[keyName]}
                                        />
                                        <SelectStyled
                                            name={keyName}
                                            onChange={e =>
                                                handleConditionChange(e)
                                            }
                                            value={list[keyName]}
                                        >
                                            {list
                                                .filter(
                                                    (m, index, array) =>
                                                        array
                                                            .map(
                                                                n => n[keyName],
                                                            )
                                                            .indexOf(
                                                                m[keyName],
                                                            ) === index,
                                                )
                                                .map((o, index) => (
                                                    <option key={index}>
                                                        {o[keyName]}
                                                    </option>
                                                ))}
                                        </SelectStyled>
                                    </ThTitle>
                                ),
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {filterList &&
                            filterList.map((e, index) => (
                                <tr key={e.id}>
                                    {data.listCollections[
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
                                            type="radio"
                                            name="main"
                                            defaultChecked={
                                                processingData === e
                                                    ? "checked"
                                                    : ""
                                            }
                                            onClick={() =>
                                                handleImportProduct(e)
                                            }
                                        />
                                    </Td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </AddScrollbar>
        </Section>
    );
}

export default ListWithRadio;
