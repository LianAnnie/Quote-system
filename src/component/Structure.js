import ListWithRadio from "./ListWithRadio";
import ListWithCheckBox from "./ListWithCheckBox";
import AssembleData from "./AssembleData";
import List from "./List";
import { useState, useEffect } from "react";
import { Button } from "./StyleComponent";
import api from "../utils/firebaseApi";

function Structure({
    parentCollectionName,
    parentList,
    childCollectionName,
    childList,
    assembleCollectionName,
    assembleList,
    setAssembleList,
}) {
    const processingDataRule = {
        id: "",
        parentData: {},
        childData: [],
    };
    const [processingData, setProcessingData] = useState(processingDataRule);
    const [parentData, setParentData] = useState({});
    const [childData, setChildData] = useState([]);
    const [renderAssembledList, setRenderAssembledList] = useState([]);

    useEffect(() => {
        handleProcessingDataChange(parentData);
    }, [parentData]);

    useEffect(() => {
        handleProcessingDataChange(childData);
    }, [childData]);

    useEffect(() => {
        const renderList = transAssembleListToRender(assembleList);
        setRenderAssembledList(renderList);
    }, [assembleList]);

    function handleProcessingDataChange(data) {
        const newProcessingData = JSON.parse(JSON.stringify(processingData));
        if (data.length === undefined) {
            newProcessingData.parentData = data;
        } else {
            newProcessingData.childData = data;
        }
        setProcessingData(newProcessingData);
    }

    async function submit() {
        const newDataArray = await api.setDocWithId(
            assembleCollectionName,
            0,
            processingData,
        );
        setAssembleList(prev => prev.concat(newDataArray));
    }

    function transAssembleListToRender(assembleList) {
        const newListtoRender = assembleList.map(e => ({
            id0: e.id[0],
            id1: e.id[1],
            id2: e.id[2],
            qty: e.qty,
            unit: e.unit,
        }));
        return newListtoRender;
    }

    return (
        <>
            <ListWithRadio
                collectionName={parentCollectionName}
                list={parentList}
                setProcessingData={setParentData}
                processingData={parentData}
            />
            <ListWithCheckBox
                collectionName={childCollectionName}
                list={childList}
                setProcessingData={setChildData}
                processingData={childData}
            />
            <AssembleData
                collectionName={assembleCollectionName}
                processingData={processingData}
                setProcessingData={setProcessingData}
            />

            <Button onClick={() => submit()}>Submit</Button>
            <List
                collectionName={assembleCollectionName}
                list={renderAssembledList}
            />
        </>
    );
}

export default Structure;
