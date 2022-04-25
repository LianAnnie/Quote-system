import styled from "styled-components";
import Input from "./Input";
import Select from "./Select";
import { useState, useEffect } from "react";
import api from "../utils/firebaseApi";
import form from "../utils/formChange";

const Container = styled.div`
    padding: 20px 5%;
`;
const Title = styled.div`
    margin-bottom: 20px;
`;
const Form = styled.div`
    border: solid 1px #000000;
    border-radius: 10px;
    padding: 20px;
    background-color: #fff;
`;
const Question = styled.div`
    display: flex;
    margin: 5px;
`;

const Button = styled.div`
    border: solid 1px #000000;
    width: 100px;
    margin: 5px;
    text-align: center;
    cursor: pointer;
`;

function Part({ collectionName, list, setList }) {
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

    const selectComponentArray = [
        {
            title: "項目",
            handleDataChange: handleExportDataChange,
            data: exportData,
            name: "class",
            optionArray: [["A", "半成品"]],
        },
        {
            title: "系列",
            handleDataChange: handleExportDataChange,
            data: exportData,
            name: "group",
            optionArray: [
                ["A", "電器"],
                ["B", "零件"],
                ["C", "原料"],
            ],
        },
    ];

    const A = [
        {
            title: "色溫",
            handleDataChange: handleExportDataChange,
            data: exportData,
            name: "spec1",
            optionArray: [
                ["27", "2700K"],
                ["30", "3000K"],
                ["40", "4000K"],
            ],
        },
        {
            title: "瓦數",
            handleDataChange: handleExportDataChange,
            data: exportData,
            name: "spec2",
            optionArray: [
                ["06", "6W"],
                ["08", "8W"],
                ["10", "10W"],
            ],
        },
        {
            title: "CRI",
            handleDataChange: handleExportDataChange,
            data: exportData,
            name: "spec3",
            optionArray: [
                ["90", "90"],
                ["95", "95"],
                ["80", "80"],
            ],
        },
    ];

    const B = [
        {
            title: "材質",
            handleDataChange: handleExportDataChange,
            data: exportData,
            name: "spec1",
            optionArray: [
                ["BR", "黃銅"],
                ["CO", "紅銅"],
                ["ST", "鋼"],
                ["AL", "鋁"],
                ["SL", "不鏽鋼"],
                ["AB", "ABS塑膠"],
                ["PP", "PP塑膠"],
                ["PC", "PC塑膠"],
                ["PA", "PA塑膠"],
            ],
        },
        {
            title: "工藝",
            handleDataChange: handleExportDataChange,
            data: exportData,
            name: "spec2",
            optionArray: [
                ["IJ", "注塑"],
                ["DC", "壓鑄"],
                ["FG", "鍛造"],
                ["BD", "折彎"],
                ["ET", "擠型"],
                ["WE", "焊接"],
                ["AS", "組裝"],
                ["NN", "其他"],
            ],
        },
        {
            title: "表面",
            handleDataChange: handleExportDataChange,
            data: exportData,
            name: "spec3",
            optionArray: [
                ["PA", "液烤"],
                ["PC", "粉烤"],
                ["PO", "拋光"],
                ["PL", "電鍍"],
                ["SB", "噴砂"],
                ["BO", "染黑"],
                ["NN", "去毛刺"],
            ],
        },
    ];

    const C = [
        {
            title: "材質",
            handleDataChange: handleExportDataChange,
            data: exportData,
            name: "spec1",
            optionArray: [
                ["Br", "黃銅"],
                ["Co", "紅銅"],
                ["ST", "鋼"],
                ["AL", "鋁"],
                ["SL", "不鏽鋼"],
                ["PL", "塑膠"],
            ],
        },
        {
            title: "規格",
            handleDataChange: handleExportDataChange,
            data: exportData,
            name: "spec2",
            optionArray: [
                ["00", "原料"],
                ["01", "板材"],
                ["02", "管材"],
                ["10", "塑膠本色"],
                ["11", "塑膠黑色"],
                ["12", "塑膠色母"],
                ["13", "塑膠色粉"],
            ],
        },
        {
            title: "顏色",
            handleDataChange: handleExportDataChange,
            data: exportData,
            name: "spec3",
            optionArray: [
                ["00", "原料"],
                ["01", "灰色"],
                ["02", "紅色"],
                ["03", "白色"],
            ],
        },
    ];

    useEffect(() => {
        const newExportData = JSON.parse(JSON.stringify(exportData));
        const snId = handleSNNumberChange(exportData, list);
        newExportData.id[ruleData.id.length - 1] = snId;
        setExportData(newExportData);
    }, [list]);

    function handleExportDataChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        const option = value.split(",");
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

    async function submit() {
        const result = Object.values(exportData).some(
            e => typeof e === "number",
        );
        if (result) {
            console.log(`請將規格選齊`);
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
        const checkId = [...data.id];
        const copyList = JSON.parse(JSON.stringify(list));
        const listId = copyList.map(e => {
            e.id.pop();
            return e.id.join("");
        });
        checkId.pop();
        const number = listId.reduce(
            (sum, id) => (id === checkId.join("") ? sum + 1 : sum),
            0,
        );
        return form.transformId(number, 2);
    }

    return (
        <Container>
            <Title>零件資料表</Title>
            <Form>
                <Question>
                    <div>零件編號</div>
                    <div>{exportData.id}</div>
                </Question>
                <Input
                    title="型號"
                    handleDataChange={handleExportDataChange}
                    data={exportData}
                    name="mark"
                    value={exportData.mark}
                />
                {selectComponentArray.map((e, index) => (
                    <Select
                        key={index}
                        title={e.title}
                        handleDataChange={e.handleDataChange}
                        data={e.data}
                        name={e.name}
                        optionArray={e.optionArray}
                    />
                ))}
                {exportData.id && exportData.id[2] === "A"
                    ? A.map((e, index) => (
                          <Select
                              key={index}
                              title={e.title}
                              handleDataChange={e.handleDataChange}
                              data={e.data}
                              name={e.name}
                              optionArray={e.optionArray}
                          />
                      ))
                    : exportData.id[2] === "B"
                    ? B.map((e, index) => (
                          <Select
                              key={index}
                              title={e.title}
                              handleDataChange={e.handleDataChange}
                              data={e.data}
                              name={e.name}
                              optionArray={e.optionArray}
                          />
                      ))
                    : exportData.id[2] === "C" &&
                      C.map((e, index) => (
                          <Select
                              key={index}
                              title={e.title}
                              handleDataChange={e.handleDataChange}
                              data={e.data}
                              name={e.name}
                              optionArray={e.optionArray}
                          />
                      ))}
            </Form>
            <Button onClick={() => submit()}>Submit</Button>
        </Container>
    );
}

export default Part;
