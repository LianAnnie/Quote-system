import styled from "styled-components";
import Input from "./Input";
import Select from "./Select";
import { useState } from "react";
import api from "../utils/firebaseApi";
import form from "../utils/formChange";

const Data = styled.div`
    padding: 20px 10%;
`;
const Title = styled.div`
    margin-bottom: 20px;
`;
const Form = styled.div`
    border: solid 1px #000000;
    padding: 20px;
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

function Product({ list, setList }) {
    const productRuleData = {
        id: ["P", "A", "A", "B", "NNNN", "T", "NN", "00"],
        //產品,燈具,系列,材質,色碼,桌燈,特殊備註
        class: "燈具",
        group: "w102",
        material: "黃銅",
        color: "材質本色",
        type: "桌燈",
        special: "無",
        mark: "",
    };
    const partRuleData = {
        id: ["S", "A", "A", "27", "06", "90", "_V8", "00"],
        //零件,大類,電器,色溫,瓦數,CRI,型號
        id: ["S", "A", "B", "PP", "01", "01", "_2m", "00"],
        //零件,大類,零件,材質,工藝,表面處理,尺寸
        id: ["S", "A", "C", "01", "00", "00", "00", "00"],
        //零件,大類,原料,色母,型號
    };
    const [exportData, setExportData] = useState(productRuleData);

    const selectComponentArray = [
        {
            title: "類別",
            handleDataChange: handleExportDataChange,
            data: exportData,
            name: "class",
            optionArray: [
                ["A", "燈具"],
                ["B", "貿易"],
            ],
        },
        {
            title: "系列",
            handleDataChange: handleExportDataChange,
            data: exportData,
            name: "group",
            optionArray: [
                ["A", "w102"],
                ["B", "w127"],
                ["C", "HOBO"],
                ["D", "w153"],
            ],
        },
        {
            title: "材質",
            handleDataChange: handleExportDataChange,
            data: exportData,
            name: "material",
            optionArray: [
                ["C", "黃銅"],
                ["I", "鐵"],
                ["P", "塑膠"],
                ["S", "不鏽鋼"],
            ],
        },
        {
            title: "色碼",
            handleDataChange: handleExportDataChange,
            data: exportData,
            name: "color",
            optionArray: [
                ["NNNN", "材質本色"],
                ["9005", "RAL黑色"],
                ["9016", "RAL白色"],
                ["0580", "NSC紅色"],
                ["0515", "NSC天藍色"],
                ["1020", "NSC黃色"],
                ["5010", "NSC褐色"],
                ["6530", "NSC藍綠色"],
            ],
        },
        {
            title: "款式",
            handleDataChange: handleExportDataChange,
            data: exportData,
            name: "type",
            optionArray: [
                ["T", "桌燈"],
                ["S", "吊燈"],
                ["W", "壁燈"],
                ["F", "落地燈"],
                ["W", "掛燈"],
            ],
        },
        {
            title: "特殊備註",
            handleDataChange: handleExportDataChange,
            data: exportData,
            name: "special",
            optionArray: [
                ["NN", "無"],
                ["02", "雙臂"],
                ["01", "單臂"],
                ["BN", "燈泡"],
                ["NC", "304開關"],
                ["ND", "調光開關"],
                ["BC", "燈泡+304開關"],
                ["BD", "燈泡+調光開關"],
            ],
        },
    ];

    function handleExportDataChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        const option = value.split(",");
        const newExportData = JSON.parse(JSON.stringify(exportData));
        if (name !== "mark") {
            const keyArray = Object.keys(productRuleData);
            const idIndex = keyArray.findIndex(e => e === name);
            newExportData.id[idIndex] = option[0];
            const snId = handleSNNumberChange(newExportData, list);
            newExportData.id[keyArray.length - 1] = snId;
            //mark不考慮id,length-1
            newExportData[name] = option;
        } else {
            newExportData[name] = value;
        }
        setExportData(newExportData);
    }

    function submit() {
        api.setDocWithId("products2", exportData.id.join(""), exportData);
        console.log(exportData);
        setExportData(productRuleData);
        setList(prev => [...prev, productRuleData]);
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

    console.log(list);

    return (
        <Data>
            <Title>產品資料表</Title>
            <Form>
                <Question>
                    <div>產品編號</div>
                    <div>{exportData.id}</div>
                </Question>
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
                <Input
                    title="備註"
                    handleDataChange={handleExportDataChange}
                    data={exportData}
                    name="mark"
                    value={exportData.mark}
                />
            </Form>
            <Button onClick={() => submit()}>Submit</Button>
        </Data>
    );
}

export default Product;
