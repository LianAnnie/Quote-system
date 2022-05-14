import { useEffect, useState } from "react";
import api from "../utils/firebaseApi";
import form from "../utils/formChange";
import {
    TBodyTdContext,
    TBodyTdButton,
    TBodyTr,
    Section,
    Title,
    Table,
    Thead,
    ThText,
    ThButtonTitle,
    TableSelectSearch,
    TableInputSearch,
    Td,
    TBody,
    Tr,
    UpdatedTr,
    Flex,
    UpdatedButton,
    DeleteButton,
    SaveButton,
    CancelEditButton,
    CancelSelectedText,
    CancelSelectedButton,
    ShowTextForButton,
    ThTitle,
    UpdateInput,
    AddScrollbar,
} from "./StyleComponent";
import data from "../utils/data";

function List({ collectionName, list, setList, mode }) {
    const filterConditionRule = {};
    const [filterList, setFilterList] = useState([]);
    const [filterCondition, setFilterCondition] = useState(filterConditionRule);
    const [revisedStatus, setRevisedStatus] = useState([]);
    const [revisedData, setRevisedData] = useState([]);
    console.log(revisedData);

    useEffect(() => {
        setFilterList(list);
        setRevisedData(list);
        if (Object.keys(list).length > 0) {
            handleConditionChange(1);
        }
    }, [list]);

    function handleConditionChange(e) {
        let newFilterList;
        let name;
        let value;
        if (e === 0) {
            setFilterList(list);
            revisedStatusArray(list);
            setRevisedData(list);
            return;
        }
        if (e !== 1) {
            name = e.target.name;
            value = e.target.value;
            const newFilterCondition = filterCondition;
            newFilterCondition[name] = value;
            console.log(newFilterCondition);
            newFilterList = handleListChange(newFilterCondition, list);
            setFilterCondition(newFilterCondition);
        } else {
            console.log(list);
            newFilterList = handleListChange(filterCondition, list);
            setFilterCondition(filterCondition);
            return;
        }
        if (newFilterList.length === 0) {
            console.log(
                `沒有符合篩選結果,清除原本篩選條件,按最後一次需求篩選資料`,
            );
            const newFilterCondition = filterConditionRule;
            newFilterCondition[name] = value;
            setFilterCondition(newFilterCondition);
            const resetList = handleListChange({ [name]: value }, list);
            setFilterList(resetList);
            revisedStatusArray(resetList);
            setRevisedData(resetList);
            return;
        }
        setFilterList(newFilterList);
        revisedStatusArray(newFilterList);
        setRevisedData(newFilterList);
    }

    function handleListChange(condition, data) {
        const newFilterList = form.handleListChange(condition, data);
        return newFilterList;
    }

    function revisedStatusArray(filterList) {
        const length = filterList.length;
        const newArray = new Array(length).fill(false);
        setRevisedStatus(newArray);
    }

    function handleRevisedStatus(index, save) {
        console.log(index);
        const newRevisedStatus = [...revisedStatus];
        const newRevisedData = [...revisedData];
        const newfilterList = [...filterList];
        const newList = list;
        if (newRevisedStatus[index]) {
            if (save) {
                newfilterList[index] = revisedData[index];
                if (
                    collectionName === "bom" ||
                    collectionName === "partQuotations2" ||
                    collectionName === "productQuotations2" ||
                    collectionName === "order"
                ) {
                    const newData = transListToffirebase(revisedData[index]);
                    console.log(revisedData[index]);
                    api.updateDoc(collectionName, newData.id.join(""), newData);
                } else {
                    const itemIndexInList = list
                        .map(e => e.id.join(""))
                        .indexOf(revisedData[index].id.join(""));
                    console.log(revisedData[index].id.join(""));
                    console.log(list.map(e => e.id.join("")));
                    console.log("這裡數字不應該都出現0", itemIndexInList);
                    newList[itemIndexInList] = revisedData[index];
                    api.updateDoc(
                        collectionName,
                        revisedData[index].id.join(""),
                        revisedData[index],
                    );
                    setList(newList);
                }
                setFilterList(newfilterList);
            } else {
                newRevisedData[index] = filterList[index];
                setRevisedData(newRevisedData);
            }
        }
        newRevisedStatus[index] = !newRevisedStatus[index];
        setRevisedStatus(newRevisedStatus);
    }

    function transListToffirebase(data) {
        let newObject;
        if (collectionName === "bom") {
            newObject = {
                id: [data.id0, data.id1, data.id2],
                qty: data.qty,
                unit: data.unit,
            };
        }
        if (
            collectionName === "productQuotations2" ||
            collectionName === "partQuotations2"
        ) {
            newObject = {
                id: [data.id0, data.id1, data.id2, data.id3],
                date: data.date,
                currency: data.currency,
                inquiryQty: data.inquiryQty,
                leadTime: data.leadTime,
                price: data.price,
                valid: data.valid,
            };
        }
        if (collectionName === "order") {
            console.log(data);
            newObject = {
                id: [data.id0, data.id1, data.id2, data.id3],
                orderId: data.orderId,
                sum: data.sum,
                currency: data.currency,
                qty: data.qty,
                price: data.price,
                date: data.date,
                requestedDate: data.requestedDate,
                remark: data.remark,
            };
        }
        return newObject;
    }

    function handleRevisedData(index, e) {
        const data = form.handleChange(index, e, revisedData);
        setRevisedData(data);
    }

    function deleteData(itemIndex) {
        const deleteData = filterList[itemIndex];
        console.log(deleteData);
        let newList;
        if (collectionName === "bom") {
            newList = list.filter(
                e =>
                    e.id0 !== deleteData.id0 ||
                    e.id1 !== deleteData.id1 ||
                    e.id2 !== deleteData.id2,
            );
        } else if (
            collectionName === "partQuotations2" ||
            collectionName === "productQuotations2" ||
            collectionName === "order"
        ) {
            newList = list.filter(
                e =>
                    e.id0 !== deleteData.id0 ||
                    e.id1 !== deleteData.id1 ||
                    e.id2 !== deleteData.id2 ||
                    e.id3 !== deleteData.id3,
            );
        } else {
            newList = list.filter(e => e.id !== deleteData.id);
        }

        const newFilterList = filterList.filter(
            (_, index) => index !== itemIndex,
        );
        if (collectionName === "bom") {
            const deleteIdArray = deleteData.id0.concat(
                deleteData.id1,
                deleteData.id2,
            );
            api.deleteDoc(collectionName, deleteIdArray);
            console.log(deleteData.id1, deleteData.id2);
            api.updateDoc("products2", deleteData.id0, deleteData.id1, 0);
            api.updateDoc("parts2", deleteData.id1, deleteData.id0, 0);
        } else if (
            collectionName === "partQuotations2" ||
            collectionName === "productQuotations2" ||
            collectionName === "order"
        ) {
            console.log(deleteData);
            const deleteIdArray = deleteData.id0.concat(
                deleteData.id1,
                deleteData.id2,
                deleteData.id3,
            );
            api.deleteDoc(collectionName, deleteIdArray);
        } else {
            console.log(123);
            api.deleteDoc(collectionName, deleteData.id.join(""));
        }
        console.log(newList);
        setList(newList);
        setFilterList(newFilterList);
    }

    console.log(list);

    return (
        <Section mode={mode}>
            <Flex>
                <Title>{data.listCollections[collectionName][0]}列表</Title>
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
            <AddScrollbar
                mode={mode}
                columnQty={data.listCollections[collectionName][1].length}
            >
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
                            {data.listCollections.all.map((e, index) => (
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
                                            value={filterCondition[keyName]}
                                        />
                                        <TableSelectSearch
                                            index={indexForStyled}
                                            columnQty={
                                                data.listCollections[
                                                    collectionName
                                                ][1].length
                                            }
                                            id={keyName}
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
                            filterList.map((e, index) =>
                                !revisedStatus[index] ? (
                                    <TBodyTr key={index}>
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
                                            <UpdatedButton
                                                sx={{
                                                    width: "30px",
                                                    height: "30px",
                                                }}
                                                onClick={() =>
                                                    handleRevisedStatus(index)
                                                }
                                            />
                                        </TBodyTdButton>
                                        <TBodyTdButton>
                                            {e.dependency &&
                                            e.dependency.length !== 0 ? (
                                                ""
                                            ) : (
                                                <DeleteButton
                                                    sx={{
                                                        width: "30px",
                                                        height: "30px",
                                                    }}
                                                    onClick={() =>
                                                        deleteData(index)
                                                    }
                                                />
                                            )}
                                        </TBodyTdButton>
                                    </TBodyTr>
                                ) : (
                                    <UpdatedTr key={index}>
                                        {data.listCollections[
                                            collectionName
                                        ][2].map((keyName, keyIndex) =>
                                            keyName.includes("id") ? (
                                                <Td key={[keyName, keyIndex]}>
                                                    {e[keyName]}
                                                </Td>
                                            ) : (
                                                <Td>
                                                    <UpdateInput
                                                        mode="list"
                                                        key={[
                                                            keyName,
                                                            keyIndex,
                                                        ]}
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
                                                    ></UpdateInput>
                                                </Td>
                                            ),
                                        )}
                                        <Td>
                                            <SaveButton
                                                sx={{
                                                    width: "30px",
                                                    height: "30px",
                                                }}
                                                onClick={() =>
                                                    handleRevisedStatus(
                                                        index,
                                                        true,
                                                    )
                                                }
                                            />
                                        </Td>
                                        <Td>
                                            <CancelEditButton
                                                sx={{
                                                    width: "30px",
                                                    height: "30px",
                                                }}
                                                onClick={() =>
                                                    handleRevisedStatus(
                                                        index,
                                                        false,
                                                    )
                                                }
                                            />
                                        </Td>
                                    </UpdatedTr>
                                ),
                            )}
                    </TBody>
                </Table>
            </AddScrollbar>
        </Section>
    );
}

export default List;
