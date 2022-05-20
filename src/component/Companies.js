import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../utils/api";
import form from "../utils/formChange";
import data from "../utils/data";
import * as S from "./StyleComponent";
import Input from "./Input";

function Companies({
    customerList,
    setCustomerList,
    supplierList,
    setSupplierList,
}) {
    const comapnyRuleData = {
        id: ["C", "US", "000"],
        company: "公司名稱",
        contacts: "聯繫",
        country: "美國",
        dependency: [],
    };
    const checkId0 = {
        C: customerList,
        F: supplierList,
    };
    const [exportData, setExportData] = useState(comapnyRuleData);

    useEffect(() => {
        handleExportDataId2Change(exportData);
    }, [customerList, supplierList]);

    function handleExportDataId2Change(data) {
        const newExportData = JSON.parse(JSON.stringify(data));
        const snArray = checkId0[data.id[0]]
            .map(e => (e.id[1] === data.id[1] ? Number(e.id[2]) : undefined))
            .filter(sn => sn !== undefined);
        const maxsn = form.getMaxsn(snArray);
        const id = form.transformId(maxsn, 3);
        newExportData.id[2] = id;
        setExportData(newExportData);
    }

    function handleExportDataIdChange(name, value) {
        const newExportData = JSON.parse(JSON.stringify(exportData));

        if (name === "id0") {
            newExportData.id[0] = value;
            newExportData.id[2] = form.transformId(checkId0[value].length, 3);
        }
        if (name === "country") {
            const id2 = data.countryList.find(country => country[1] === value);
            newExportData.id[1] = id2[0];
            newExportData[name] = id2[1];
        }
        handleExportDataId2Change(newExportData);
    }

    function handleExportDataInputChange(e) {
        const newExportData = exportData;
        const data = form.handleDataChange(
            "_",
            e.target.name,
            e.target.value,
            newExportData,
        );
        setExportData(data);
    }

    function submit() {
        const checkResult = checkExportData(exportData);
        if (checkResult) {
            const docId = exportData.id.join("");
            if (docId[0] === "C") {
                api.setDocWithId("customers2", docId, exportData);
                setCustomerList(prev => [...prev, exportData]);
            }
            if (docId[0] === "F") {
                api.setDocWithId("suppliers2", docId, exportData);
                setSupplierList(prev => [...prev, exportData]);
            }
            const resetCompanyRuleData = { ...exportData };
            resetCompanyRuleData.company = "公司名稱";
            resetCompanyRuleData.contacts = "聯繫";
            setExportData(resetCompanyRuleData);
        }
    }

    function checkExportData(data) {
        if (data.company.trim() === "") {
            alert(`公司名稱不能空白`);
            return false;
        }
        if (data.contacts.trim() === "") {
            alert(`聯繫資料不能空白`);
            return false;
        }
        return true;
    }

    return (
        <S.Article mode="origin" fileName="companies">
            <S.Title>公司資料表</S.Title>
            <S.Form>
                <S.SingleLine>
                    <S.LabelStyled>供應類別</S.LabelStyled>
                    <S.SelectStyled
                        name="id0"
                        value={exportData.id[0]}
                        onChange={e =>
                            handleExportDataIdChange(
                                e.target.name,
                                e.target.value,
                            )
                        }
                    >
                        <option value="F">供應商</option>
                        <option value="C">客戶</option>
                    </S.SelectStyled>
                </S.SingleLine>
                <S.SingleLine>
                    <S.LabelStyled>公司編號</S.LabelStyled>
                    <S.DataStyled>{exportData.id}</S.DataStyled>
                </S.SingleLine>
                {data.companies.inputComponentArray.map(e => (
                    <Input
                        fileName="companies"
                        key={e.name}
                        title={e.title}
                        type="text"
                        handleDataChange={handleExportDataInputChange}
                        name={e.name}
                        data={exportData}
                    />
                ))}
                <S.SingleLine>
                    <S.LabelStyled>地區</S.LabelStyled>
                    <S.SelectStyled
                        name="country"
                        value={exportData.country}
                        onChange={e => {
                            handleExportDataIdChange(
                                e.target.name,
                                e.target.value,
                            );
                        }}
                    >
                        {data.countryList.map(([countryCode, countryName]) => (
                            <option key={countryCode} value={countryName}>
                                {countryName}
                            </option>
                        ))}
                    </S.SelectStyled>
                </S.SingleLine>
                <S.AddButton
                    sx={{ width: "30px", height: "30px" }}
                    onClick={() => submit()}
                />
            </S.Form>
        </S.Article>
    );
}

Companies.propTypes = {
    customerList: PropTypes.array,
    setCustomerList: PropTypes.func,
    supplierList: PropTypes.array,
    setSupplierList: PropTypes.func,
};

export default Companies;
