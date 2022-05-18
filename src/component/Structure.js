import ListWithRadio from "./ListWithRadio";
import ListWithCheckBox from "./ListWithCheckBox";
import AssembleData from "./AssembleData";
import List from "./List";
import { useState, useEffect } from "react";
import * as S from "./StyleComponent";
import api from "../utils/firebaseApi";
import Quotes from "./Quotes";
import Orders from "./Orders";
import data from "../utils/data";
import ErrorBoundary from "../admin/ErrorBoundary";

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
    const startPage = {
        bom: 3,
        partQuotations2: 2,
        productQuotations2: 2,
        order: 2,
    };
    const [processingData, setProcessingData] = useState(processingDataRule);
    const [parentData, setParentData] = useState({});
    const [childData, setChildData] = useState([]);
    const [renderAssembledList, setRenderAssembledList] = useState([]);
    const [page, setPage] = useState(0);

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
    }, [assembleCollectionName, assembleList]);

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
        setProcessingData(newProcessingData);
    }

    async function submit() {
        const result = checkProcessingData(
            processingData,
            assembleCollectionName,
        );
        if (!result) {
            return;
        } else {
            const newDataArray = await api.setDocWithId(
                assembleCollectionName,
                0,
                processingData,
            );
            if (assembleCollectionName === "bom") {
                bomDependency(newDataArray);
            }
            if (assembleCollectionName === "order") {
                orderDependency(newDataArray);
            }
            setAssembleList(prev => prev.concat(newDataArray));
        }
        setProcessingData(processingDataRule);
        setParentData({});
        setChildData([]);
        setPage(0);
    }

    function orderDependency(data) {
        if (data.length > 0) {
            const productsId = data.map(e => e.id[1]);
            productsId.forEach((e, index) => {
                // api.updateDoc("products2", e, { dependency: [] });
            });
        }
    }

    function bomDependency(data) {
        if (data.length > 0) {
            data.forEach(e => {
                api.updateDoc("products2", e.id[0], e.id[1], 1);
                api.updateDoc("parts2", e.id[1], e.id[0], 1);
            });
        }
    }

    function checkProcessingData(parameterData, collectionName) {
        if (
            Object.keys(parameterData.parentData).length === 0 ||
            parameterData.parentData.id === undefined
        ) {
            alert(data.errorMessage[collectionName][0]);
            return false;
        }
        if (parameterData.childData.length === 0) {
            alert(data.errorMessage[collectionName][1]);
            return false;
        }

        if (collectionName === "bom") {
            const qtyArry = parameterData.childData
                .map(e => e.qty)
                .filter(e => isNaN(Number(e)));
            if (qtyArry.length > 0) {
                alert(data.errorMessage[collectionName][2]);
                return false;
            }
            const indexArray = parameterData.childData.map(e =>
                Number(e.index),
            );
            const array = [...new Set(indexArray)];
            if (indexArray.length !== array.length) {
                alert(data.errorMessage[collectionName][3]);
                return false;
            }
        }
        if (
            collectionName === "partQuotations2" ||
            collectionName === "productQuotations2" ||
            collectionName === "order"
        ) {
            if (parameterData.parentData.date === undefined) {
                alert(data.errorMessage[collectionName][5]);
                return false;
            }

            if (
                collectionName === "partQuotations2" ||
                collectionName === "productQuotations2"
            ) {
                if (parameterData.parentData.valid === undefined) {
                    alert(data.errorMessage[collectionName][5]);
                    return false;
                }
                const qtyArry = parameterData.childData
                    .map(e => e.inquiryQty)
                    .filter(e => isNaN(Number(e)));
                if (qtyArry.length > 0) {
                    alert(data.errorMessage[collectionName][2]);
                    return false;
                }
            }

            if (collectionName === "order") {
                if (parameterData.parentData.requestedDate === undefined) {
                    alert(data.errorMessage[collectionName][5]);
                    return false;
                }
                if (parameterData.parentData.orderId === undefined) {
                    alert(data.errorMessage[collectionName][6]);
                    return false;
                }
                const qtyArry = parameterData.childData
                    .map(e => e.qty)
                    .filter(e => isNaN(Number(e)));
                if (qtyArry.length > 0) {
                    alert(data.errorMessage[collectionName][2]);
                    return false;
                }
            }

            if (parameterData.parentData.currency === undefined) {
                alert(data.errorMessage[collectionName][4]);
                return false;
            }

            const priceArry = parameterData.childData
                .map(e => e.price)
                .filter(e => isNaN(Number(e)));
            if (priceArry.length > 0) {
                alert(data.errorMessage[collectionName][3]);
                return false;
            }
        }
        if (collectionName === "productQuotations2") {
        }
        const childKeys = data.assembleDataCollections[collectionName][6];
        const checkValeus = parameterData.childData.map(e =>
            childKeys.filter(key => e[key] === undefined),
        );
        if (checkValeus.filter(e => e.length !== 0).length > 0) {
            alert(data.errorMessage[collectionName][7]);
            return false;
        }

        return true;
    }

    function transAssembleListToRender(assembleCollectionName, assembleList) {
        let newListtoRender;
        if (assembleCollectionName === "bom") {
            newListtoRender = assembleList.map(e =>
                e.id === undefined
                    ? e
                    : {
                          id0: e.id[0],
                          id1: e.id[1],
                          id2: e.id[2],
                          qty: e.qty,
                          unit: e.unit,
                      },
            );
            return newListtoRender;
        }
        if (
            assembleCollectionName === "partQuotations2" ||
            assembleCollectionName === "productQuotations2"
        ) {
            newListtoRender = assembleList.map(e =>
                e.id === undefined
                    ? e
                    : {
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
                      },
            );
        }
        if (assembleCollectionName === "order") {
            newListtoRender = assembleList.map(e =>
                e.id === undefined
                    ? e
                    : {
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
                      },
            );
        }
        return newListtoRender;
    }

    function pageChange(value) {
        if (value === startPage[assembleCollectionName]) {
            setPage(startPage[assembleCollectionName]);
            return;
        }
        if (value === 0) {
            setPage(0);
            return;
        }
        if (assembleCollectionName === "bom") {
            if (page + value < 6 && page + value > 2) {
                setPage(prev => prev + value);
                return;
            }
        } else if (page + value < 6 && page + value > 1) {
            setPage(prev => prev + value);
            return;
        }
    }

    function close() {
        pageChange(0);
        setProcessingData(processingDataRule);
    }

    return (
        <>
            <S.CreatNewData
                page={page}
                sx={{ fontSize: 70 }}
                onClick={() => pageChange(startPage[assembleCollectionName])}
            />
            <S.NewDataContainer>
                <S.NewDataForm page={page}>
                    {page === 0 ? null : (
                        <>
                            <AssembleData
                                mode="structure"
                                page={page}
                                collectionName={assembleCollectionName}
                                processingData={processingData}
                                setProcessingData={setProcessingData}
                                childData={childData}
                            />
                        </>
                    )}
                    {page === 2
                        ? (assembleCollectionName === "partQuotations2" ||
                              assembleCollectionName ===
                                  "productQuotations2") && (
                              <Quotes
                                  mode="strucutre"
                                  page={page}
                                  handleDataChange={handleProcessingDataChange}
                                  processingData={processingData}
                              />
                          )
                        : null}
                    {page === 2
                        ? (assembleCollectionName === "order" ||
                              assembleCollectionName === "purchase") && (
                              <Orders
                                  mode="strucutre"
                                  page={page}
                                  handleDataChange={handleProcessingDataChange}
                                  processingData={processingData}
                              />
                          )
                        : null}
                    {page === 3 ? (
                        <ListWithRadio
                            mode="structure"
                            page={page}
                            listPosition="inner"
                            collectionName={parentCollectionName}
                            list={parentList}
                            setProcessingData={setParentData}
                            processingData={parentData}
                        />
                    ) : null}
                    {page === 4 ? (
                        <ListWithCheckBox
                            mode="structure"
                            page={page}
                            listPosition="inner"
                            collectionName={childCollectionName}
                            list={childList}
                            setProcessingData={setChildData}
                            processingData={childData}
                        />
                    ) : null}

                    {page === 5 ? (
                        <S.AddButton
                            sx={{ width: "30px", height: "30px", fontSize: 26 }}
                            mode="structure"
                            page={page}
                            fix="fix"
                            onClick={() => submit()}
                        />
                    ) : null}
                    <S.CloseButton
                        sx={{ width: "30px", height: "30px" }}
                        page={page}
                        onClick={() => close()}
                    />
                    {assembleCollectionName === "bom" &&
                    page === 3 ? null : assembleCollectionName === "order" &&
                      page === 2 ? null : assembleCollectionName ===
                          "partQuotations2" &&
                      page === 2 ? null : assembleCollectionName ===
                          "productQuotations2" && page === 2 ? null : (
                        <S.BackButton
                            sx={{ width: "30px", height: "30px" }}
                            page={page}
                            onClick={() => pageChange(-1)}
                        />
                    )}
                    {page === 5 ? null : (
                        <S.NextButton
                            sx={{ width: "30px", height: "30px" }}
                            page={page}
                            onClick={() => pageChange(1)}
                        />
                    )}
                </S.NewDataForm>
            </S.NewDataContainer>
            <ErrorBoundary>
                <List
                    mode="structure"
                    collectionName={assembleCollectionName}
                    list={renderAssembledList}
                    setList={setAssembleList}
                />
            </ErrorBoundary>
        </>
    );
}

export default Structure;
