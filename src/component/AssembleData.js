import { Section, Title, Table, Th, Td, Button } from "./StyleComponent";
import form from "../utils/formChange";

function AssembleData({ collectionName, processingData, setProcessingData }) {
    const collections = {
        bom: [
            "結構",
            ["產品編號", "系列", "材質", "色碼", "款式"],
            ["id", "group", "material", "color", "type"],
            ["零件編號", "型號"],
            ["id", "mark"],
            ["使用量", "單位", "順序", "刪除"],
            ["qty", "unit", "index"],
        ],
        partQuotations2: [
            "零件",
            ["報價日期", "有效日期", "幣別", "廠商編號", "公司名稱"],
            ["date", "valid", "currency", "id", "company"],
            ["零件編號", "型號"],
            ["id", "mark"],
            ["數量", "單價", "交期", "刪除"],
            ["inquiryQty", "price", "leadTime"],
        ],
        productQuotations2: [
            "產品",
            ["報價日期", "有效日期", "幣別", "客戶編號", "公司名稱"],
            ["date", "valid", "currency", "id", "company"],
            ["產品編號", "系列"],
            ["id", "group"],
            ["數量", "單價", "交期", "刪除"],
            ["inquiryQty", "price", "leadTime"],
        ],
    };

    function handleAddDataChange(itemIndex, e) {
        const newProcessingData = JSON.parse(JSON.stringify(processingData));
        let newChildData;
        if (e.id === undefined) {
            newChildData = form.handleChange(
                itemIndex,
                e,
                processingData.childData,
            );
        } else {
            newChildData = processingData.childData.filter(
                (_, index) => index !== itemIndex,
            );
        }
        newProcessingData.childData = newChildData;
        console.log(newProcessingData);
        setProcessingData(newProcessingData);
    }

    return (
        <Section>
            <Title>{collections[collectionName][0]}列表</Title>
            <Table>
                <thead>
                    <tr>
                        {collections[collectionName][1].map((e, index) => (
                            <Th key={index}>{e}</Th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {processingData &&
                            collections[collectionName][2].map(
                                (keyName, index) => (
                                    <Td key={index}>
                                        {processingData.parentData[keyName]}
                                    </Td>
                                ),
                            )}
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        {collections[collectionName][3].map((e, index) => (
                            <Th key={index}>{e}</Th>
                        ))}
                        {collections[collectionName][5].map((e, index) => (
                            <Th key={index}>{e}</Th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {processingData &&
                        processingData.childData.map((e, index) => (
                            <tr key={[e.id, index]}>
                                {collections[collectionName][4].map(keyName => (
                                    <Td key={keyName}>{e[keyName]}</Td>
                                ))}
                                {collections[collectionName][6].map(keyName => (
                                    <Td key={keyName}>
                                        <input
                                            name={keyName}
                                            onChange={e =>
                                                handleAddDataChange(index, e)
                                            }
                                            key={keyName}
                                            value={e[keyName]}
                                        />
                                    </Td>
                                ))}
                                <Td>
                                    <Button
                                        onClick={() =>
                                            handleAddDataChange(index, e)
                                        }
                                    >
                                        刪除
                                    </Button>
                                </Td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </Section>
    );
}

export default AssembleData;
