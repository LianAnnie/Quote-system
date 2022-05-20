import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import data from "../utils/data";
import form from "../utils/formChange";
import * as S from "./StyleComponent";

function ListWithRadio({
    collectionName,
    list,
    setProcessingData,
    processingData,
    mode,
    listPosition,
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
        <S.Section mode={mode} listPosition={listPosition}>
            <S.Flex>
                <S.Title>
                    請選擇包含的
                    {data.listInformation[collectionName]["listName"]}
                </S.Title>
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
            <S.AddScrollbar mode={mode} page="4" listPosition={listPosition}>
                <S.Table>
                    <S.Thead>
                        <S.Tr>
                            {data.listInformation[collectionName][
                                "listTitle"
                            ].map((e, index) => (
                                <S.ThTitle key={index} index={index}>
                                    {e}
                                </S.ThTitle>
                            ))}
                            {data.listInformation.selectTitle.map(
                                (e, index) => (
                                    <S.ThButtonTitle key={index}>
                                        {e}
                                    </S.ThButtonTitle>
                                ),
                            )}
                        </S.Tr>
                        <S.Tr>
                            {data.listInformation[collectionName][
                                "listDataKey"
                            ].map((keyName, indexForStyled) => (
                                <S.ThText key={keyName} index={indexForStyled}>
                                    <S.TableInputSearch
                                        index={indexForStyled}
                                        columnQty={
                                            data.listInformation[
                                                collectionName
                                            ]["listTitle"].length
                                        }
                                        type="text"
                                        name={keyName}
                                        onChange={e => handleConditionChange(e)}
                                        value={list[keyName]}
                                    />
                                    <S.TableSelectSearch
                                        index={indexForStyled}
                                        columnQty={
                                            data.listInformation[
                                                collectionName
                                            ]["listTitle"].length
                                        }
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
                                    </S.TableSelectSearch>
                                </S.ThText>
                            ))}
                            <th></th>
                            <th></th>
                        </S.Tr>
                    </S.Thead>
                    <S.TBody>
                        {filterList &&
                            filterList.map(e => (
                                <S.Tr key={e.id}>
                                    {data.listInformation[collectionName][
                                        "listDataKey"
                                    ].map((keyName, indexForStyled) => (
                                        <S.TBodyTdContext
                                            key={keyName}
                                            index={indexForStyled}
                                        >
                                            {e[keyName]}
                                        </S.TBodyTdContext>
                                    ))}
                                    <S.TBodyTdButton>
                                        <S.UpdateInput
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
                                    </S.TBodyTdButton>
                                </S.Tr>
                            ))}
                    </S.TBody>
                </S.Table>
            </S.AddScrollbar>
        </S.Section>
    );
}

ListWithRadio.propTypes = {
    collectionName: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    setProcessingData: PropTypes.func.isRequired,
    processingData: PropTypes.array,
    mode: PropTypes.string,
    listPosition: PropTypes.string,
};

export default ListWithRadio;
