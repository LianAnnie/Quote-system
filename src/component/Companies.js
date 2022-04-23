import styled from "styled-components";
import { useState, useEffect } from "react";
import api from "../utils/firebaseApi";
import form from "../utils/formChange";
import data from "../utils/data";

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

function Companies({
    customerList,
    setCustomerList,
    supplierList,
    setSupplierList,
}) {
    const comapnyRuleData = {
        id: ["C", "us", "000"],
        company: "公司名稱",
        contacts: "聯繫人",
        country: "美國",
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
        const id2 = checkId0[data.id[0]].filter(
            e => e.id[1] === data.id[1],
        ).length;
        const id = form.transformId(id2, 3);
        newExportData.id[2] = id;
        setExportData(newExportData);
    }

    function handleExportDataIdChange(e) {
        const newExportData = JSON.parse(JSON.stringify(exportData));
        const name = e.target.name;
        const value = e.target.value;

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
        const data = form.handleChange("_", e, newExportData);
        // console.log(data);
        setExportData(data);
    }

    function submit() {
        const docId = exportData.id.join("");
        console.log(exportData);
        if (docId[0] === "C") {
            api.setDocWithId("customers2", docId, exportData);
            setCustomerList(prev => [...prev, exportData]);
        }
        if (docId[0] === "F") {
            api.setDocWithId("suppliers2", docId, exportData);
            setSupplierList(prev => [...prev, exportData]);
        }
        setExportData(comapnyRuleData);
    }

    return (
        <Data>
            <Title>公司資料表</Title>
            <Form>
                <Question>
                    <div>供應類別</div>
                    <select
                        name="id0"
                        value={exportData.id[0]}
                        onChange={e => handleExportDataIdChange(e)}
                    >
                        <option value="F">供應商</option>
                        <option value="C">客戶</option>
                    </select>
                </Question>
                <Question>
                    <div>公司編號</div>
                    <div>{exportData.id}</div>
                </Question>
                <Question>
                    <div>公司名稱</div>
                    <input
                        type="text"
                        name="company"
                        onChange={e => {
                            handleExportDataInputChange(e);
                        }}
                        value={exportData.company}
                    />
                </Question>
                <Question>
                    <div>聯繫資料</div>
                    <input
                        type="text"
                        name="contacts"
                        onChange={e => {
                            handleExportDataInputChange(e);
                        }}
                        value={exportData.contacts}
                    />
                </Question>
                <Question>
                    <div>國家</div>
                    <select
                        name="country"
                        value={exportData.country}
                        onChange={e => {
                            handleExportDataIdChange(e);
                        }}
                    >
                        {data.countryList.map((country, index) => (
                            <option key={country[0]} value={country[1]}>
                                {country[1]}
                            </option>
                        ))}
                    </select>
                </Question>
            </Form>
            <Button onClick={() => submit()}>Submit</Button>
        </Data>
    );
}

export default Companies;
