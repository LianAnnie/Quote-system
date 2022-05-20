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
        <S.Section mode={mode} listPosition={listPosition}>
            <S.Flex>
                <S.Title>
                    請選擇一個{data.listInformation[collectionName]["listName"]}
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
            <S.AddScrollbar mode={mode} page="3" listPosition={listPosition}>
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
                                <S.TrBody key={e.id}>
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
                                </S.TrBody>
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
    processingData: PropTypes.array.isRequired,
    mode: PropTypes.string.isRequired,
    listPosition: PropTypes.string,
};

export default ListWithRadio;
