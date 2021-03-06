import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../utils/api";
import form from "../utils/formChange";
import data from "../utils/data";
import Input from "./Input";
import Select from "./Select";
import * as S from "./StyleComponent";

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
            alert(`??????????????????`);
            return false;
        }
        return true;
    }

    function handleSNNumberChange(data, list) {
        return form.handleSNNumberChange(data, list);
    }

    return (
        <S.Article mode="origin">
            <S.Title>???????????????</S.Title>
            <S.Form>
                <S.SingleLine>
                    <S.LabelStyled>????????????</S.LabelStyled>
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
                    title="??????"
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

Product.propTypes = {
    collectionName: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    setList: PropTypes.func.isRequired,
};

export default Product;
