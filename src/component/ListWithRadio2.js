import { useEffect, useState } from "react";
import { Section, Title, Table, Th, Td, Button } from "./StyleComponent";
import data from "../utils/data";
import form from "../utils/formChange";
import { db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";

function ListWithRadio2({ collectionName, list, setProcessingData }) {
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
        <Section>
            <Title>
                {data.listWithRadioCollections[collectionName][0]}列表
            </Title>
            <Button
                onClick={() => {
                    handleConditionChange(0);
                }}
            >
                取消篩選
            </Button>
            <Table>
                <thead>
                    <tr>
                        {data.listWithRadioCollections[collectionName][1].map(
                            (e, index) => (
                                <Th key={index}>{e}</Th>
                            ),
                        )}
                    </tr>
                    <tr>
                        {data.listWithRadioCollections[collectionName][2].map(
                            keyName => (
                                <Th key={keyName}>
                                    <input
                                        type="text"
                                        name={keyName}
                                        onChange={e => handleConditionChange(e)}
                                        value={renderList[keyName]}
                                    />
                                    <select
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
                                            .map((o, index) => (
                                                <option key={index}>
                                                    {o[keyName]}
                                                </option>
                                            ))}
                                    </select>
                                </Th>
                            ),
                        )}
                    </tr>
                </thead>
                <tbody>
                    {filterList &&
                        filterList.map(e => (
                            <tr key={e.id}>
                                {data.listWithRadioCollections[
                                    collectionName
                                ][2].map(keyName => (
                                    <Td key={keyName}>{e[keyName]}</Td>
                                ))}
                                <Td>
                                    <input
                                        type="radio"
                                        name="main"
                                        onClick={() => handleImportProduct(e)}
                                    />
                                </Td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </Section>
    );
}

export default ListWithRadio2;
