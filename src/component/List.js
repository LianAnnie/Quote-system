import { useEffect, useState } from "react";
import api from "../utils/firebaseApi";
import form from "../utils/formChange";
import * as S from "./StyleComponent";
import data from "../utils/data";

function List({ collectionName, list, setList, mode }) {
    const filterConditionRule = {};
    const [filterList, setFilterList] = useState([]);
    const [filterCondition, setFilterCondition] = useState(filterConditionRule);
    const [revisedStatus, setRevisedStatus] = useState([]);
    const [revisedData, setRevisedData] = useState([]);

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
            newFilterList = handleListChange(newFilterCondition, list);
            setFilterCondition(newFilterCondition);
        } else {
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
                    api.updateDoc(collectionName, newData.id.join(""), newData);
                } else {
                    const itemIndexInList = list
                        .map(e => e.id.join(""))
                        .indexOf(revisedData[index].id.join(""));
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
            api.updateDoc("products2", deleteData.id0, deleteData.id1, 0);
            api.updateDoc("parts2", deleteData.id1, deleteData.id0, 0);
        } else if (
            collectionName === "partQuotations2" ||
            collectionName === "productQuotations2" ||
            collectionName === "order"
        ) {
            const deleteIdArray = deleteData.id0.concat(
                deleteData.id1,
                deleteData.id2,
                deleteData.id3,
            );
            api.deleteDoc(collectionName, deleteIdArray);
        } else {
            api.deleteDoc(collectionName, deleteData.id.join(""));
        }
        setList(newList);
        setFilterList(newFilterList);
    }

    return (
        <S.Section mode={mode} collectionName={collectionName}>
            <S.Flex>
                <S.Title>{data.listCollections[collectionName][0]}列表</S.Title>
                <S.ShowTextForButton>
                    <S.CancelSelectedButton
                        sx={{ width: "30px", height: "30px" }}
                        onClick={() => {
                            handleConditionChange(0);
                        }}
                    />
                    <S.CancelSelectedText> 取消篩選</S.CancelSelectedText>
                </S.ShowTextForButton>
            </S.Flex>
            <S.AddScrollbar
                mode={mode}
                columnQty={data.listCollections[collectionName][1].length}
            >
                <S.Table>
                    <S.Thead>
                        <S.Tr>
                            {data.listCollections[collectionName][1].map(
                                (e, index) => (
                                    <S.ThTitle key={index} index={index}>
                                        {e}
                                    </S.ThTitle>
                                ),
                            )}
                            {data.listCollections.all.map((e, index) => (
                                <S.ThButtonTitle key={index}>
                                    {e}
                                </S.ThButtonTitle>
                            ))}
                        </S.Tr>
                        <S.Tr>
                            {data.listCollections[collectionName][2].map(
                                (keyName, indexForStyled) => (
                                    <S.ThText
                                        key={keyName}
                                        index={indexForStyled}
                                    >
                                        <S.TableInputSearch
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
                                        <S.TableSelectSearch
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
                                        </S.TableSelectSearch>
                                    </S.ThText>
                                ),
                            )}
                            <th></th>
                            <th></th>
                        </S.Tr>
                    </S.Thead>

                    <S.TBody>
                        {filterList &&
                            filterList.map((e, index) =>
                                !revisedStatus[index] ? (
                                    <S.TBodyTr key={index}>
                                        {data.listCollections[
                                            collectionName
                                        ][2].map((keyName, indexForStyled) => (
                                            <S.TBodyTdContext
                                                key={keyName}
                                                index={indexForStyled}
                                            >
                                                {e[keyName]}
                                            </S.TBodyTdContext>
                                        ))}
                                        <S.TBodyTdButton>
                                            <S.UpdatedButton
                                                sx={{
                                                    width: "30px",
                                                    height: "30px",
                                                }}
                                                onClick={() =>
                                                    handleRevisedStatus(index)
                                                }
                                            />
                                        </S.TBodyTdButton>
                                        <S.TBodyTdButton>
                                            {e.dependency &&
                                            e.dependency.length !== 0 ? (
                                                <S.DeleteButton
                                                    sx={{
                                                        width: "30px",
                                                        height: "30px",
                                                    }}
                                                    dependency={true}
                                                />
                                            ) : (
                                                <S.DeleteButton
                                                    sx={{
                                                        width: "30px",
                                                        height: "30px",
                                                    }}
                                                    onClick={() =>
                                                        deleteData(index)
                                                    }
                                                />
                                            )}
                                        </S.TBodyTdButton>
                                    </S.TBodyTr>
                                ) : (
                                    <S.UpdatedTr key={index}>
                                        {data.listCollections[
                                            collectionName
                                        ][2].map((keyName, keyIndex) =>
                                            keyName.includes("id") ? (
                                                <S.Td key={[keyName, keyIndex]}>
                                                    {e[keyName]}
                                                </S.Td>
                                            ) : (
                                                <S.Td>
                                                    <S.UpdateInput
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
                                                    ></S.UpdateInput>
                                                </S.Td>
                                            ),
                                        )}
                                        <S.Td>
                                            <S.SaveButton
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
                                        </S.Td>
                                        <S.Td>
                                            <S.CancelEditButton
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
                                        </S.Td>
                                    </S.UpdatedTr>
                                ),
                            )}
                    </S.TBody>
                </S.Table>
            </S.AddScrollbar>
        </S.Section>
    );
}

export default List;
