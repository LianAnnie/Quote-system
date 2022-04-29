import Input from "./Input";
import Select from "./Select";
import { useState, useEffect } from "react";
import api from "../utils/firebaseApi";
import form from "../utils/formChange";
import { Section, Title, Form, Question, Button } from "./StyleComponent";
import data from "../utils/data";

function Product({ collectionName, list, setList }) {
    const ruleData = {
        id: ["P", 0, 0, 0, 0, 0, 0, 0],
        class: 0,
        group: 0,
        material: 0,
        color: 0,
        type: 0,
        special: 0,
        mark: "",
        dependency: [],
    };
    const [exportData, setExportData] = useState(ruleData);

    const keylimitQty = {
        products2: {
            class: 1,
            group: 1,
            material: 1,
            color: 4,
            type: 1,
            special: 2,
        },
    };

    const keylimitQtyArray = {
        products2: [1, 1, 1, 4, 1, 2],
    };

    useEffect(() => {
        const newExportData = JSON.parse(JSON.stringify(exportData));
        const snId = handleSNNumberChange(exportData, list);
        newExportData.id[ruleData.id.length - 1] = snId;
        setExportData(newExportData);
    }, [list]);

    function handleExportDataChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        const option = checkChangeData(collectionName, name, value.split(","));
        const newExportData = JSON.parse(JSON.stringify(exportData));
        if (name !== "mark") {
            const keyArray = Object.keys(ruleData);
            const idIndex = keyArray.findIndex(e => e === name);
            newExportData.id[idIndex] = option[0];
            const snId = handleSNNumberChange(newExportData, list);
            newExportData.id[ruleData.id.length - 1] = snId;
            newExportData[name] = option;
        } else {
            newExportData[name] = value;
        }
        setExportData(newExportData);
    }

    function checkChangeData(collectionName, key, value) {
        console.log(key, value);
        const option = [];

        const limitQty = keylimitQty[collectionName][key];
        if (value.length < 2) {
            option[0] = value.toString().slice(0, limitQty).toUpperCase();
            option[1] = value.toString().slice(limitQty);
        } else if (value.length === 2) {
            option[0] = value[0].slice(0, limitQty).toUpperCase();
            option[1] = value[1];
        } else if (value.length > 2) {
            option[0] = value[0].slice(0, limitQty).toUpperCase();
            value.shift();
            option[1] = value.join("");
        }
        console.log(option);
        console.log(`型號輸入為${option[0]}`);
        console.log(`輸入內容為${option[1]}`);
        return option;
    }

    async function submit() {
        const checkResult = checkExportData(exportData);

        if (checkResult) {
            const newExportData = await api.setDocWithId(
                collectionName,
                exportData.id.join(""),
                exportData,
            );
            setExportData(ruleData);
            setList(prev => [...prev, newExportData]);
        }
    }

    function checkExportData(data) {
        // const idRule = data.id.map((e, index) =>
        //     e.toString().length !== keylimitQtyArray[collectionName][index]
        //         ? false
        //         : true,
        // );
        // console.log(idRule);
        // console.log(idRule.some(e => e === false));
        // if (idRule.some(e => e === false)) {
        //     alert(`型號規格錯誤`);
        //     return false;
        // }
        const result = Object.values(data).some(e => typeof e === "number");
        if (result) {
            alert(`請將規格選齊`);
            return false;
        }
        return true;
    }

    function handleSNNumberChange(data, list) {
        return form.handleSNNumberChange(data, list);
    }

    return (
        <Section>
            <Title>產品資料表</Title>
            <Form>
                <Question>
                    <div>產品編號</div>
                    <div>{exportData.id}</div>
                </Question>
                {data.product.selectComponentArray.map((e, index) => (
                    <Select
                        key={index}
                        title={e.title}
                        handleDataChange={handleExportDataChange}
                        data={exportData}
                        name={e.name}
                        optionArray={e.optionArray}
                    />
                ))}
                <Input
                    title="備註"
                    type="text"
                    handleDataChange={handleExportDataChange}
                    data={exportData}
                    name="mark"
                    value={exportData.mark}
                />
            </Form>
            <Button onClick={() => submit()}>Submit</Button>
        </Section>
    );
}

export default Product;
