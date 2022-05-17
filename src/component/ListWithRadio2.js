import { useEffect, useState } from "react";
import * as S from "./StyleComponent";
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
        <S.Section mode={mode}>
            <S.Flex>
                <S.Title>請選擇一項產品</S.Title>
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
            <S.AddScrollbar mode={mode}>
                <S.Table>
                    <S.Thead>
                        <S.Tr>
                            {data.listCollections[collectionName][3].map(
                                (e, index) => (
                                    <S.ThTitle key={index} index={index}>
                                        {e}
                                    </S.ThTitle>
                                ),
                            )}
                            {data.listCollections.select.map((e, index) => (
                                <S.ThButtonTitle key={index}>
                                    {e}
                                </S.ThButtonTitle>
                            ))}
                        </S.Tr>
                        <S.Tr>
                            {data.listCollections[collectionName][4].map(
                                (keyName, indexForStyled) => (
                                    <S.ThText
                                        key={keyName}
                                        index={indexForStyled}
                                        columnQty={
                                            data.listCollections[
                                                collectionName
                                            ][4].length
                                        }
                                    >
                                        <S.TableInputSearch
                                            type="text"
                                            index={indexForStyled}
                                            columnQty={7}
                                            name={keyName}
                                            onChange={e =>
                                                handleConditionChange(e)
                                            }
                                            value={list[keyName]}
                                        />
                                        <S.TableSelectSearch
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
                            filterList.map(e => (
                                <S.Tr key={e.id}>
                                    {data.listCollections[
                                        collectionName
                                    ][4].map((keyName, indexForStyled) => (
                                        <S.TBodyTdContext
                                            key={keyName}
                                            index={indexForStyled}
                                        >
                                            {e[keyName]}
                                        </S.TBodyTdContext>
                                    ))}
                                    <S.TBodyTdButton>
                                        <S.UpdateInput
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
                                    </S.TBodyTdButton>
                                </S.Tr>
                            ))}
                    </S.TBody>
                </S.Table>
            </S.AddScrollbar>
        </S.Section>
    );
}

export default ListWithRadio2;
