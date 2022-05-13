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
    ShowTextForButton,
    CancelSelectedText,
    ThTitle,
    UpdateInput,
    AddScrollbar,
    TrBody,
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
        <Section mode={mode}>
            <Flex>
                <Title>
                    請選擇一個{data.listCollections[collectionName][0]}
                </Title>
                <ShowTextForButton>
                    <CancelSelectedButton
                        sx={{ width: "30px", height: "30px" }}
                        onClick={() => {
                            handleConditionChange(0);
                        }}
                    />
                    <CancelSelectedText> 取消篩選</CancelSelectedText>
                </ShowTextForButton>
            </Flex>
            <AddScrollbar mode={mode} page="3">
                <Table>
                    <Thead>
                        <Tr>
                            {data.listCollections[collectionName][1].map(
                                (e, index) => (
                                    <ThTitle key={index} index={index}>
                                        {e}
                                    </ThTitle>
                                ),
                            )}
                            {data.listCollections.select.map((e, index) => (
                                <ThButtonTitle key={index}>{e}</ThButtonTitle>
                            ))}
                        </Tr>
                        <Tr>
                            {data.listCollections[collectionName][2].map(
                                (keyName, indexForStyled) => (
                                    <ThText
                                        key={keyName}
                                        index={indexForStyled}
                                    >
                                        <TableInputSearch
                                            index={indexForStyled}
                                            columnQty={
                                                data.listCollections[
                                                    collectionName
                                                ][1].length
                                            }
                                            type="text"
                                            name={keyName}
                                            onChange={e =>
                                                handleConditionChange(e)
                                            }
                                            value={list[keyName]}
                                        />
                                        <TableSelectSearch
                                            index={indexForStyled}
                                            columnQty={
                                                data.listCollections[
                                                    collectionName
                                                ][1].length
                                            }
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
                                        </TableSelectSearch>
                                    </ThText>
                                ),
                            )}
                            <th></th>
                            <th></th>
                        </Tr>
                    </Thead>
                    <TBody>
                        {filterList &&
                            filterList.map((e, index) => (
                                <TrBody key={e.id}>
                                    {data.listCollections[
                                        collectionName
                                    ][2].map((keyName, indexForStyled) => (
                                        <TBodyTdContext
                                            key={keyName}
                                            index={indexForStyled}
                                        >
                                            {e[keyName]}
                                        </TBodyTdContext>
                                    ))}
                                    <TBodyTdButton>
                                        <UpdateInput
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
                                    </TBodyTdButton>
                                </TrBody>
                            ))}
                    </TBody>
                </Table>
            </AddScrollbar>
        </Section>
    );
}

export default ListWithRadio;
