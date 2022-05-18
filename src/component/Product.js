import Input from "./Input";
import Select from "./Select";
import { useState, useEffect } from "react";
import api from "../utils/api";
import form from "../utils/formChange";
import * as S from "./StyleComponent";
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
        return form.checkChangeData(collectionName, key, value);
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
        <S.Article mode="origin">
            <S.Title>產品資料表</S.Title>
            <S.Form>
                <S.SingleLine>
                    <S.LabelStyled>產品編號</S.LabelStyled>
                    <S.DataStyled>{exportData.id}</S.DataStyled>
                </S.SingleLine>
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
                <S.AddButton
                    sx={{ width: "30px", height: "30px" }}
                    onClick={() => submit()}
                />
            </S.Form>
        </S.Article>
    );
}

export default Product;
