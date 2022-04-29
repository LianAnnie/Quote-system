import ListWithCheckBox2 from "./ListWithCheckBox2";
import AssembleData2 from "./AssembleData2";
import ListWithRadio2 from "./ListWithRadio2";
import AnalysisForm from "./AnalysisForm";
import List from "./List";
import Drawing from "./Drawing";
import { useState, useEffect } from "react";
import { Button, Form } from "./StyleComponent";
import api from "../utils/firebaseApi";
import data from "../utils/data";

function Structure2({
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
    const [filterChildList, setFilterChildList] = useState([]);
    const [renderAssembledList, setRenderAssembledList] = useState([]);
    const [pieData, setPieData] = useState([]);
    const [margin, setMargin] = useState(0);

    // console.log(parentList);
    useEffect(() => {
        handleProcessingDataChange(parentData, parentList, childList);
    }, [parentData]);

    useEffect(() => {
        handleProcessingDataChange(childData, parentList, childList);
    }, [childData]);

    useEffect(() => {
        const renderList = transAssembleListToRender(
            assembleCollectionName,
            assembleList,
        );
        setRenderAssembledList(renderList);
    }, [assembleList]);

    function getPieData(data, totalPrice) {
        console.log(data);
        const getDataArray = data.map(e => [
            e.idP,
            Math.floor(((e.price * e.qty) / totalPrice) * 100),
        ]);
        console.log(getDataArray);
        setPieData(getDataArray);
    }

    function handleProcessingDataChange(data, parentList, childList) {
        const newProcessingData = JSON.parse(JSON.stringify(processingData));

        if (data.target !== undefined) {
            const name = data.target.name;
            const value = data.target.value;
            newProcessingData.parentData[name] = value;
        } else if (data.length === undefined) {
            const keyArray = Object.keys(data);
            keyArray.forEach(
                key => (newProcessingData.parentData[key] = data[key]),
            );
            const childIdArray = getChildDataId(data, parentList);
            const newFilterList = getFilterChildList(childIdArray, childList);
            setFilterChildList(newFilterList);
        } else {
            newProcessingData.childData = transProcessingChildDataToRender(
                assembleCollectionName,
                data,
                parentList,
                processingData,
            );
        }
        const sum = getSum(newProcessingData);
        if (sum !== undefined) {
            newProcessingData.parentData[sum[0]] = sum[1];
            console.log(newProcessingData);
            const margin = getMargin(newProcessingData, sum[1]);
            const price = getPrice(newProcessingData, sum[1]);
            if (margin !== undefined) {
                console.log(margin);
                newProcessingData.parentData[margin[0]] = margin[1];
                setMargin(margin[1]);
            }
            if (price !== undefined) {
                console.log(price);
                newProcessingData.parentData[price[0]] = price[1];
            }
            getPieData(newProcessingData.childData, sum[1]);
        }
        const valid = getValid(newProcessingData);
        if (valid) {
            newProcessingData.parentData[valid[0]] = valid[1];
        }

        setProcessingData(newProcessingData);
    }

    function getChildDataId(data, list) {
        if (Object.keys(data).length !== 0) {
            const checkId = data.id.join("");
            const result = list
                .filter(e => e.id[0] === checkId)
                .map(e => e.id[1]);
            return result;
        }
    }

    function getFilterChildList(idArray, list) {
        if (idArray) {
            const filterChildlist = idArray.map(e =>
                list.filter(i => i.id[0] === e),
            );
            return filterChildlist.flat(1);
        }
    }

    async function submit() {
        // checkProcessingData(processingData)
        const newDataArray = await api.setDocWithId(
            assembleCollectionName,
            0,
            processingData,
        );
        setAssembleList(prev => prev.concat(newDataArray));
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

    function transProcessingChildDataToRender(
        assembleCollectionName,
        ChildDataArray,
        parentList,
        processingData,
    ) {
        if (assembleCollectionName === "analysis") {
            const renderChildDataArray = [...ChildDataArray];
            const newChildArray = renderChildDataArray.map(e => {
                if (e.idP === undefined) {
                    const getQty = parentList
                        .filter(p => p.id.includes(e.id[0]))
                        .filter(p =>
                            p.id.includes(
                                processingData.parentData.id.join(""),
                            ),
                        );
                    const childData = {
                        idP: e.id[0],
                        qty: getQty[0].qty,
                        unit: getQty[0].unit,
                        inquiryQty: e.inquiryQty,
                        price: e.price,
                        currency: e.currency,
                        leadTime: e.leadTime,
                        valid: e.valid,
                        idF: e.id[1],
                    };
                    return childData;
                }
                return e;
            });
            return newChildArray;
        }
    }

    function getSum(dataParameter) {
        if (
            dataParameter.parentData.currency !== undefined &&
            dataParameter.childData !== undefined &&
            dataParameter.childData.length > 0
        ) {
            const parentCurrency = dataParameter.parentData.currency.split(",");
            if (parentCurrency.length !== 2) {
                return ["sum", "請確認已選擇正確幣值"];
            } else {
                const parentCurrencyExchangeRate = data.exchangeRate.filter(
                    e => e[0] === parentCurrency[0],
                )[0][2];
                if (parentCurrencyExchangeRate === undefined) {
                    return ["sum", "請確認已選擇正確幣值"];
                } else {
                    const childCurrencyExchangeRateArray =
                        dataParameter.childData.map(
                            e =>
                                data.exchangeRate.filter(
                                    rate =>
                                        rate[0] === e.currency.split(",")[0],
                                )[0][2],
                        );
                    const sum =
                        Math.floor(
                            dataParameter.childData.reduce(
                                (sum, e, index) =>
                                    sum +
                                    (e.qty * e.price * 10000) /
                                        (Number(
                                            childCurrencyExchangeRateArray[
                                                index
                                            ],
                                        ) *
                                            100),
                                0,
                            ) * parentCurrencyExchangeRate,
                        ) / 100;
                    return ["sum", sum];
                }
            }
        }
    }

    function getPrice(dataParameter, sum) {
        console.log(Number(sum));
        console.log(Number(dataParameter.parentData.expoectedMargin));
        if (dataParameter.parentData.expoectedMargin !== undefined) {
            return [
                "caculatedPrice",
                Math.floor(
                    Number(sum) *
                        (100 +
                            Number(dataParameter.parentData.expoectedMargin)),
                ) / 100,
            ];
        }
    }

    function getMargin(dataParameter, sum) {
        console.log(Number(dataParameter.parentData.expectedPrice));
        if (
            dataParameter.parentData.expectedPrice !== undefined &&
            !isNaN(dataParameter.parentData.expectedPrice)
        ) {
            return [
                "caculatedMargin",
                Math.floor(
                    (Number(dataParameter.parentData.expectedPrice) /
                        Number(sum) -
                        1) *
                        10000,
                ) / 100,
            ];
        }
    }

    function getValid(dataParameter) {
        console.log(dataParameter);
        if (dataParameter.childData && dataParameter.childData.length > 0) {
            const minValid = dataParameter.childData.reduce(
                (min, e) =>
                    min < Number(e.valid.split("-").join(""))
                        ? min
                        : Number(e.valid.split("-").join("")),
                30000000,
            );
            return ["valid", minValid];
        }
    }

    console.log(processingData.parentData);

    return (
        <>
            <AnalysisForm
                handleDataChange={handleProcessingDataChange}
                processingData={processingData}
            />
            <ListWithRadio2
                collectionName={parentCollectionName}
                list={parentList}
                setProcessingData={setParentData}
                processingData={parentData}
            />
            <ListWithCheckBox2
                collectionName={childCollectionName}
                list={filterChildList}
                setProcessingData={setChildData}
                processingData={childData}
            />
            <AssembleData2
                collectionName={assembleCollectionName}
                processingData={processingData}
                setProcessingData={setProcessingData}
            />
            <Drawing profitMargin={margin} pieData={pieData} />

            <Button onClick={() => submit()}>Submit</Button>
            {/* <List
                collectionName={assembleCollectionName}
                list={renderAssembledList}
                setList={setAssembleList}
            /> */}
        </>
    );
}

export default Structure2;
