import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import PropTypes from "prop-types";
import data from "../utils/data";
import form from "../utils/formChange";
import { db } from "../utils/firebase";
import * as S from "./StyleComponent";

function AnalysisListWithRadio({
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

    async function getPartsQtationsFromFireBase(idList) {
        const quotationDataPromise = idList.map(async id => {
            const docRef = doc(db, parameters.parentRenderCollectionName, id);
            const newData = await getDoc(docRef);
            return newData.data();
        });

        const quotationData = await Promise.all(quotationDataPromise);
        return quotationData;
    }

    function getRenderListId(parameterData, idIndex) {
        const idArray = parameterData.map(e => e.id[idIndex]);
        const idArrayWithuniqueness = [...new Set(idArray)];
        return idArrayWithuniqueness;
    }

    async function getParentRenderList(parameterList) {
        const idArray = getRenderListId(parameterList, parameters.idIndex);
        const renderData = await getPartsQtationsFromFireBase(idArray);
        setRenderList(renderData);
    }

    useEffect(() => {
        getParentRenderList(list);
    }, [list]);

    useEffect(() => {
        setFilterList(renderList);
    }, [renderList]);

    function handleListChange(condition, parameterData) {
        const newFilterList = form.handleListChange(condition, parameterData);
        return newFilterList;
    }

    function handleConditionChange(e) {
        if (e === 0) {
            setFilterCondition({});
            setFilterList(renderList);
            return;
        }
        const { name, value } = e.target;
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

    function handleImportProduct(e) {
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
                            {data.listInformation[
                                collectionName
                            ].newDataListTitle.map((e, index) => (
                                <S.ThTitle key={e} index={index}>
                                    {e}
                                </S.ThTitle>
                            ))}
                            {data.listInformation.selectTitle.map(e => (
                                <S.ThButtonTitle key={e}>{e}</S.ThButtonTitle>
                            ))}
                        </S.Tr>
                        <S.Tr>
                            {data.listInformation[
                                collectionName
                            ].newDataListKey.map((keyName, indexForStyled) => (
                                <S.ThText
                                    key={keyName}
                                    index={indexForStyled}
                                    columnQty={
                                        data.listInformation[collectionName]
                                            .newDataListKey.length
                                    }
                                >
                                    <S.TableInputSearch
                                        type="text"
                                        index={indexForStyled}
                                        columnQty={7}
                                        name={keyName}
                                        onChange={e => handleConditionChange(e)}
                                        value={list[keyName]}
                                    />
                                    <S.TableSelectSearch
                                        index={indexForStyled}
                                        columnQty={7}
                                        name={keyName}
                                        onChange={e => handleConditionChange(e)}
                                        value={renderList[keyName]}
                                    >
                                        {renderList
                                            .filter(
                                                (m, index, array) =>
                                                    array
                                                        .map(n => n[keyName])
                                                        .indexOf(m[keyName]) ===
                                                    index,
                                            )
                                            .map(o => (
                                                <option key={o}>
                                                    {o[keyName]}
                                                </option>
                                            ))}
                                    </S.TableSelectSearch>
                                </S.ThText>
                            ))}
                            <th aria-label="forViewSpace" />
                            <th aria-label="forViewSpace" />
                        </S.Tr>
                    </S.Thead>
                    <S.TBody>
                        {filterList &&
                            filterList.map(e => (
                                <S.Tr key={e.id}>
                                    {data.listInformation[
                                        collectionName
                                    ].newDataListKey.map(
                                        (keyName, indexForStyled) => (
                                            <S.TBodyTdContext
                                                key={keyName}
                                                index={indexForStyled}
                                            >
                                                {e[keyName]}
                                            </S.TBodyTdContext>
                                        ),
                                    )}
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

AnalysisListWithRadio.propTypes = {
    collectionName: PropTypes.string,
    list: PropTypes.array.isRequired,
    setProcessingData: PropTypes.func,
    processingData: PropTypes.shape({
        class: PropTypes.string,
        color: PropTypes.string,
        dependency: PropTypes.array,
        group: PropTypes.string,
        id: PropTypes.array,
        mark: PropTypes.string,
        material: PropTypes.string,
        special: PropTypes.string,
        type: PropTypes.string,
    }),
    mode: PropTypes.string,
};

export default AnalysisListWithRadio;
