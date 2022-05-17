import ListWithCheckBox2 from "./ListWithCheckBox2";
import AssembleData2 from "./AssembleData2";
import ListWithRadio2 from "./ListWithRadio2";
import AnalysisForm from "./AnalysisForm";
import Drawing from "./Drawing";
import {
    AnalysisDataContainer,
    AnalysisDataForm,
    NextButton,
    BackButton,
    AnalysisDrawingContainer,
    Flex,
} from "./StyleComponent";
import { useState, useEffect } from "react";
import data from "../utils/data";
import ExportExcel from "./ExportExcel";

function Structure2({
    parentCollectionName,
    parentList,
    childCollectionName,
    childList,
    assembleCollectionName,
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
    const [pieData, setPieData] = useState([]);
    const [margin, setMargin] = useState(0);
    const [page, setPage] = useState(4);

    function pageChange(value) {
        console.log(value);
        if (value === 0) {
            setPage(0);
            return;
        }
        if (page + value < 6 && page + value > 3) {
            setPage(prev => prev + value);
            return;
        }
    }
    useEffect(() => {
        handleProcessingDataChange(parentData, parentList, childList);
    }, [parentData]);

    useEffect(() => {
        handleProcessingDataChange(childData, parentList, childList);
    }, [childData]);

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
            newProcessingData.childData = [];
            const keyArray = Object.keys(data);
            keyArray.forEach(
                key => (newProcessingData.parentData[key] = data[key]),
            );
            const childIdArray = getChildDataId(data, parentList);
            // console.log(childIdArray);
            const newFilterList = getFilterChildList(childIdArray, childList);
            setFilterChildList(newFilterList);
            // console.log(newProcessingData);
        } else {
            // console.log(data);
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

    function transProcessingChildDataToRender(
        assembleCollectionName,
        childDataArray,
        parentList,
        processingData,
    ) {
        if (assembleCollectionName === "analysis") {
            console.log(parentList);
            console.log(processingData.parentData);
            console.log(childDataArray);

            const renderChildDataArray = [...childDataArray];
            const newChildArray = renderChildDataArray.map(e => {
                if (e.idP === undefined) {
                    const getQty = parentList.filter(p =>
                        p.id.includes(e.id[0]),
                    );
                    // .filter(p =>
                    //     p.id.includes(
                    //         processingData.parentData.id.join(""),
                    //     ),
                    // );
                    console.log(parentList);
                    console.log(parentList.filter(p => p.id.includes(e.id[0])));
                    console.log(
                        parentList
                            .filter(p => p.id.includes(e.id[0]))
                            .filter(p =>
                                p.id.includes(
                                    processingData.parentData.id.join(""),
                                ),
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

    console.log(processingData);

    return (
        <>
            <AnalysisDataContainer>
                <ExportExcel data={processingData} />
                <AnalysisDataForm>
                    <Flex>
                        <AnalysisForm
                            mode={assembleCollectionName}
                            handleDataChange={handleProcessingDataChange}
                            processingData={processingData}
                            setProcessingData={setProcessingData}
                        />
                        {page === 4 ? (
                            <ListWithRadio2
                                mode={assembleCollectionName}
                                collectionName={parentCollectionName}
                                list={parentList}
                                setProcessingData={setParentData}
                                processingData={parentData}
                            />
                        ) : null}
                        {page === 5 ? (
                            <ListWithCheckBox2
                                mode={assembleCollectionName}
                                collectionName={childCollectionName}
                                list={filterChildList}
                                setProcessingData={setChildData}
                                processingData={childData}
                            />
                        ) : null}
                        {page === 5 ? (
                            <BackButton
                                sx={{ width: "30px", height: "30px" }}
                                mode={assembleCollectionName}
                                page={page}
                                onClick={() => pageChange(-1)}
                            />
                        ) : null}
                        {page === 4 ? (
                            <NextButton
                                sx={{ width: "30px", height: "30px" }}
                                mode={assembleCollectionName}
                                page={page}
                                onClick={() => pageChange(1)}
                            />
                        ) : null}
                    </Flex>
                </AnalysisDataForm>
                <AnalysisDrawingContainer>
                    <AssembleData2
                        collectionName={assembleCollectionName}
                        processingData={processingData}
                        setProcessingData={setProcessingData}
                    />
                    <Drawing profitMargin={margin} pieData={pieData} />
                </AnalysisDrawingContainer>
            </AnalysisDataContainer>
        </>
    );
}

export default Structure2;
