import Input from "./Input";
import Select from "./Select";
import { useState, useEffect } from "react";
import api from "../utils/firebaseApi";
import form from "../utils/formChange";
import {
    Form,
    SingleLine,
    LabelStyled,
    DataStyled,
    AddButton,
    Title,
    Article,
} from "./StyleComponent";
import data from "../utils/data";

function Part({ collectionName, list, setList, columnQty }) {
    const ruleData = {
        id: ["S", "A", 0, 0, 0, 0, 0],
        class: ["A", "半成品"],
        group: 0,
        spec1: 0,
        spec2: 0,
        spec3: 0,
        mark: "",
        dependency: [],
    };
    const [exportData, setExportData] = useState(ruleData);

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
        let newExportData = JSON.parse(JSON.stringify(exportData));
        if (name !== "mark") {
            if (name === "group") {
                newExportData = ruleData;
            }
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
        return form.checkChangeData(collectionName, key, value);
    }

    async function submit() {
        if (
            exportData.id[2] !== "A" &&
            exportData.id[2] !== "B" &&
            exportData.id[2] !== "C"
        ) {
            alert(`請選擇系列分類(3擇1)`);
            return;
        }
        if (exportData.id.slice(3, 6).join("").length < 6) {
            alert(
                `細部規格資料請至少各輸入2個字元(英文/數字）做為產品編碼資料`,
            );
            return;
        }
        const newExportData = await api.setDocWithId(
            collectionName,
            exportData.id.join(""),
            exportData,
        );
        setExportData(ruleData);
        setList(prev => [...prev, newExportData]);
    }

    function handleSNNumberChange(data, list) {
        return form.handleSNNumberChange(data, list);
    }

    return (
        <Article mode="origin">
            <Title>零件資料表</Title>
            <Form columnQty={columnQty}>
                <SingleLine>
                    <LabelStyled>零件編號</LabelStyled>
                    <DataStyled>{exportData.id}</DataStyled>
                </SingleLine>
                <SingleLine>
                    <LabelStyled>項目</LabelStyled>
                    <DataStyled>半成品</DataStyled>
                </SingleLine>
                {data.part.selectComponentArray.map(
                    (e, index) =>
                        index !== 0 && (
                            <Select
                                key={index}
                                title={e.title}
                                handleDataChange={handleExportDataChange}
                                data={exportData}
                                name={e.name}
                                optionArray={e.optionArray}
                            />
                        ),
                )}
                {exportData.id && exportData.id[2] === "A"
                    ? data.part.A.map((e, index) => (
                          <Select
                              key={index}
                              title={e.title}
                              handleDataChange={handleExportDataChange}
                              data={exportData}
                              name={e.name}
                              optionArray={e.optionArray}
                          />
                      ))
                    : exportData.id[2] === "B"
                    ? data.part.B.map((e, index) => (
                          <Select
                              key={index}
                              title={e.title}
                              handleDataChange={handleExportDataChange}
                              data={exportData}
                              name={e.name}
                              optionArray={e.optionArray}
                          />
                      ))
                    : exportData.id[2] === "C" &&
                      data.part.C.map((e, index) => (
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
                    title="型號"
                    type="text"
                    handleDataChange={handleExportDataChange}
                    data={exportData}
                    name="mark"
                    value={exportData.mark}
                />
                <AddButton
                    sx={{ width: "30px", height: "30px" }}
                    onClick={() => submit()}
                />
            </Form>
        </Article>
    );
}

export default Part;
