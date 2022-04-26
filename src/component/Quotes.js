import Input from "./Input";
import Select from "./Select";
import ListWithRadio from "./ListWithRadio";
import ListWithCheckBox from "./ListWithCheckBox";
import AssembleData from "./AssembleData";
import List from "./List";
import { useState, useEffect } from "react";
import { Section, Title, Form, Button } from "./StyleComponent";
import api from "../utils/firebaseApi";
import data from "../utils/data";

function Quotes({ handleDataChange, processingData }) {
    // console.log(processingData);
    const inputComponentArray = [
        {
            title: "報價日期",
            name: "date",
        },
        {
            title: "有效日期",
            name: "valid",
        },
    ];

    return (
        <Section>
            <Form>
                {inputComponentArray.map(e => (
                    <Input
                        key={e.title}
                        title={e.title}
                        type="date"
                        handleDataChange={handleDataChange}
                        data={processingData}
                        name={e.name}
                    />
                ))}
                <Select
                    title="幣別"
                    handleDataChange={handleDataChange}
                    name="currency"
                    optionArray={data.currencyList}
                />
            </Form>
        </Section>
    );
}

function ole() {
    function Quotes() {
        const processingDataRule = {
            id: "",
            parentData: {},
            childData: [],
        };
        const [processingData, setProcessingData] =
            useState(processingDataRule);
        const [childData, setChildData] = useState([]);
        const [childList, setChildList] = useState([]);
        const inputComponentArray = [
            {
                title: "報價日期",
                name: "date",
            },
            {
                title: "有效日期",
                name: "valid",
            },
        ];
        const collectionName = "parts2";
        const assembleCollectionName = "partQuotations2";
        const inquiryQty = [10, 250, 1000, 5000];

        useEffect(() => {
            getListFromFirebase();
        }, []);

        useEffect(() => {
            handleProcessingDataChange(childData);
        }, [childData]);

        async function getListFromFirebase() {
            const list = await api.getCompleteCollection(collectionName);
            setChildList(list);
        }

        function handleProcessingDataChange(data) {
            const newProcessingData = JSON.parse(
                JSON.stringify(processingData),
            );
            if (data.length === undefined) {
                const name = data.target.name;
                const value = data.target.value;
                newProcessingData.parentData[name] = value;
            } else {
                const newData = data.map(e =>
                    inquiryQty.map(qty => {
                        const q = JSON.parse(JSON.stringify(e));
                        q.inquiryQty = qty;
                        q.price = "0";
                        q.leadTime = "30";
                        return q;
                    }),
                );
                newProcessingData.childData = newData.flat(1);
            }
            console.log(newProcessingData);
            setProcessingData(newProcessingData);
        }

        async function submit() {
            const newDataArray = await api.setDocWithId(
                assembleCollectionName,
                0,
                processingData,
            );
            // setAssembleList(prev => prev.concat(newDataArray));
        }

        return (
            <Section>
                <Title>零件報價表</Title>
                <Form>
                    {inputComponentArray.map(e => (
                        <Input
                            key={e.title}
                            title={e.title}
                            type="date"
                            handleDataChange={handleProcessingDataChange}
                            data={processingData}
                            name={e.name}
                        />
                    ))}
                    <Select
                        title="幣別"
                        handleDataChange={handleProcessingDataChange}
                        name="currency"
                        optionArray={data.currencyList}
                    />
                </Form>
                <ListWithCheckBox
                    collectionName={collectionName}
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
            </Section>
        );
    }
}

export default Quotes;
