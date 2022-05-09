import { useEffect, useState } from "react";
import {
    TBodyTdContext,
    TBodyTdButton,
    Section,
    Title,
    Table,
    Thead,
    ThText,
    ThButtonTitle,
    TableSelectSearch,
    TableInputSearch,
    TBody,
    Tr,
    Flex,
    CancelSelectedButton,
    ThTitle,
    UpdateInput,
    AddScrollbar,
} from "./StyleComponent";
import data from "../utils/data";
import form from "../utils/formChange";

function ListWithRadio({
    collectionName,
    list,
    setProcessingData,
    processingData,
    mode,
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
        console.log(newFilterCondition);
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
        <Section mode={mode}>
            <Flex>
                <Title>
                    請選擇需包含分析的{data.listCollections[collectionName][0]}
                </Title>
                <CancelSelectedButton
                    onClick={() => {
                        handleConditionChange(0);
                    }}
                />
            </Flex>
            <AddScrollbar>
                <Table>
                    <Thead>
                        <Tr>
                            {data.listCollections[collectionName][3].map(
                                (e, index) => (
                                    <ThTitle
                                        key={index}
                                        index={index}
                                        mode="bom"
                                    >
                                        {e}
                                    </ThTitle>
                                ),
                            )}
                            {data.listCollections.select.map((e, index) => (
                                <ThButtonTitle key={index}>{e}</ThButtonTitle>
                            ))}
                        </Tr>
                        <Tr>
                            {list &&
                                data.listCollections[collectionName][4].map(
                                    (keyName, indexForStyled) => (
                                        <ThText
                                            key={keyName}
                                            index={indexForStyled}
                                        >
                                            <TableInputSearch
                                                index={indexForStyled}
                                                columnQty={7}
                                                type="text"
                                                name={keyName}
                                                onChange={e =>
                                                    handleConditionChange(e)
                                                }
                                                value={list[keyName]}
                                            />
                                            <TableSelectSearch
                                                index={indexForStyled}
                                                columnQty={7}
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
                                                                    n =>
                                                                        n[
                                                                            keyName
                                                                        ],
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
                                            </TableSelectSearch>
                                        </ThText>
                                    ),
                                )}
                        </Tr>
                    </Thead>
                    <TBody>
                        {filterList &&
                            filterList.map((e, index) => (
                                <Tr key={e.id}>
                                    {data.listCollections[
                                        collectionName
                                    ][4].map((keyName, indexForStyled) =>
                                        indexForStyled === 0 ? (
                                            <TBodyTdContext
                                                key={keyName}
                                                index={indexForStyled}
                                            >
                                                {[e[keyName][0], e[keyName][1]]}
                                            </TBodyTdContext>
                                        ) : (
                                            <TBodyTdContext
                                                key={keyName}
                                                index={indexForStyled}
                                            >
                                                {e[keyName]}
                                            </TBodyTdContext>
                                        ),
                                    )}
                                    <TBodyTdButton>
                                        <UpdateInput
                                            type="checkbox"
                                            name="child"
                                            defaultChecked={
                                                processingData.some(
                                                    data => data === e,
                                                )
                                                    ? "checked"
                                                    : ""
                                            }
                                            onClick={() =>
                                                handleImportProduct(e)
                                            }
                                        />
                                    </TBodyTdButton>
                                </Tr>
                            ))}
                    </TBody>
                </Table>
            </AddScrollbar>
        </Section>
    );
}

export default ListWithRadio;
