import ListWithRadio from "./ListWithRadio";
import ListWithCheckBox from "./ListWithCheckBox";
import AssembleData from "./AssembleData";
import List from "./List";
import { useState, useEffect } from "react";
import { Button, Form } from "./StyleComponent";
import api from "../utils/firebaseApi";
import Quotes from "./Quotes";
import Orders from "./Orders";
import data from "../utils/data";

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

    // console.log(parentList);
    useEffect(() => {
        handleProcessingDataChange(parentData);
    }, [parentData]);

    useEffect(() => {
        handleProcessingDataChange(childData);
    }, [childData]);

    useEffect(() => {
        const renderList = transAssembleListToRender(
            assembleCollectionName,
            assembleList,
        );
        setRenderAssembledList(renderList);
    }, [assembleList]);

    function handleProcessingDataChange(parameterData) {
        const newProcessingData = JSON.parse(JSON.stringify(processingData));
        if (parameterData.target !== undefined) {
            const name = parameterData.target.name;
            const value = parameterData.target.value;
            newProcessingData.parentData[name] = value;
        } else if (parameterData.length === undefined) {
            const keyArray = Object.keys(parameterData);
            keyArray.forEach(
                key => (newProcessingData.parentData[key] = parameterData[key]),
            );
        } else {
            if (
                assembleCollectionName !== "partQuotations2" &&
                assembleCollectionName !== "productQuotations2"
            ) {
                console.log(assembleCollectionName);
                newProcessingData.childData = parameterData;
            } else {
                const newData = parameterData.map(e =>
                    data.inquiryQty.map(qty => {
                        const q = JSON.parse(JSON.stringify(e));
                        q.inquiryQty = qty;
                        q.price = "0";
                        q.leadTime = "30";
                        return q;
                    }),
                );
                newProcessingData.childData = newData.flat(1);
            }
        }
        console.log(newProcessingData);
        setProcessingData(newProcessingData);
    }

    async function submit() {
        // checkProcessingData(processingData)
        console.log(processingData);
        const newDataArray = await api.setDocWithId(
            assembleCollectionName,
            0,
            processingData,
        );
        setAssembleList(prev => prev.concat(newDataArray));
    }

    function checkProcessingData(data) {
        console.log(data);
        console.log(Object.keys(data.parentData));
        if (Object.keys(data.parentData).length === 0) {
            console.log(`父層沒有資料`);
            return false;
        }
    }

    function transAssembleListToRender(assembleCollectionName, assembleList) {
        let newListtoRender;
        if (assembleCollectionName === "bom") {
            newListtoRender = assembleList.map(e => ({
                id0: e.id[0],
                id1: e.id[1],
                id2: e.id[2],
                qty: e.qty,
                unit: e.unit,
            }));
            return newListtoRender;
        }
        if (
            assembleCollectionName === "partQuotations2" ||
            assembleCollectionName === "productQuotations2"
        ) {
            newListtoRender = assembleList.map(e => ({
                id0: e.id[0],
                id1: e.id[1],
                id2: e.id[2],
                id3: e.id[3],
                inquiryQty: e.inquiryQty,
                price: e.price,
                currency: e.currency,
                leadTime: e.leadTime,
                date: e.date,
                valid: e.valid,
            }));
        }
        if (assembleCollectionName === "order") {
            newListtoRender = assembleList.map(e => ({
                id0: e.id[0],
                id1: e.id[1],
                id2: e.id[2],
                id3: e.id[3],
                orderId: e.orderId,
                sum: e.sum,
                currency: e.currency,
                qty: e.qty,
                price: e.price,
                date: e.date,
                requestedDate: e.requestedDate,
                remark: e.remark,
            }));
        }
        return newListtoRender;
    }

    return (
        <>
            {(assembleCollectionName === "partQuotations2" ||
                assembleCollectionName === "productQuotations2") && (
                <Quotes
                    handleDataChange={handleProcessingDataChange}
                    processingData={processingData}
                />
            )}
            {(assembleCollectionName === "order" ||
                assembleCollectionName === "purchase") && (
                <Orders
                    handleDataChange={handleProcessingDataChange}
                    processingData={processingData}
                />
            )}
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
                setList={setAssembleList}
            />
        </>
    );
}

export default Structure;
