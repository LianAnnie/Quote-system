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
import { db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";

function ListWithRadio2({
    collectionName,
    list,
    setProcessingData,
    processingData,
    mode,
}) {
    const [renderList, setRenderList] = useState([]);
    const [filterList, setFilterList] = useState([]);
    const [filterCondition, setFilterCondition] = useState({});
    const parameters = {
        parentRenderCollectionName: "products2",
        idIndex: 0,
    };

    useEffect(() => {
        getParentRenderList(list);
    }, [list]);

    useEffect(() => {
        setFilterList(renderList);
    }, [renderList]);

    async function getParentRenderList(list) {
        const idArray = getRenderListId(list, parameters.idIndex);
        const renderData = await getPartsQtationsFromFireBase(idArray);
        setRenderList(renderData);
    }

    function getRenderListId(data, idIndex) {
        const idArray = data.map(e => e.id[idIndex]);
        // console.log(idArray);
        const idArrayWithuniqueness = [...new Set(idArray)];
        // console.log(idArrayWithuniqueness);
        return idArrayWithuniqueness;
    }

    async function getPartsQtationsFromFireBase(idList) {
        const quotationDataPromise = idList.map(async id => {
            // console.log(id.toString().trim());
            const docRef = doc(db, parameters.parentRenderCollectionName, id);
            const data = await getDoc(docRef);
            return data.data();
        });

        const quotationData = await Promise.all(quotationDataPromise);
        return quotationData;
    }

    function handleConditionChange(e) {
        if (e === 0) {
            setFilterCondition({});
            setFilterList(renderList);
            return;
        }
        const name = e.target.name;
        const value = e.target.value;
        console.log(name, value);
        const newFilterCondition = JSON.parse(JSON.stringify(filterCondition));
        newFilterCondition[name] = value;
        const newFilterList = handleListChange(newFilterCondition, filterList);
        if (newFilterList.length === 0) {
            console.log(
                `沒有符合篩選結果,清除原本篩選條件,按最後一次需求篩選資料`,
            );
            setFilterCondition({ [name]: value });
            const resetList = handleListChange({ [name]: value }, filterList);
            setFilterList(resetList);
            return;
        }
        setFilterCondition(newFilterCondition);
        setFilterList(newFilterList);
    }

    function handleListChange(condition, data) {
        console.log(data);
        const newFilterList = form.handleListChange(condition, data);
        return newFilterList;
    }

    function handleImportProduct(e) {
        // console.log(e);
        setProcessingData(e);
    }

    return (
        <Section mode={mode}>
            <Flex>
                <Title>請選擇一項產品</Title>
                <CancelSelectedButton
                    onClick={() => {
                        handleConditionChange(0);
                    }}
                />
            </Flex>
            <AddScrollbar mode={mode}>
                <Table>
                    <Thead>
                        <Tr>
                            {data.listCollections[collectionName][3].map(
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
                            {data.listCollections[collectionName][4].map(
                                (keyName, indexForStyled) => (
                                    <ThText
                                        key={keyName}
                                        index={indexForStyled}
                                        columnQty={
                                            data.listCollections[
                                                collectionName
                                            ][4].length
                                        }
                                    >
                                        <TableInputSearch
                                            type="text"
                                            index={indexForStyled}
                                            columnQty={7}
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
                                            value={renderList[keyName]}
                                        >
                                            {renderList
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
                        </Tr>
                    </Thead>
                    <TBody>
                        {filterList &&
                            filterList.map(e => (
                                <Tr key={e.id}>
                                    {data.listCollections[
                                        collectionName
                                    ][4].map((keyName, indexForStyled) => (
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
                                </Tr>
                            ))}
                    </TBody>
                </Table>
            </AddScrollbar>
        </Section>
    );
}

export default ListWithRadio2;
