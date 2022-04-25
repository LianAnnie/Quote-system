import { Section, Title, Table, Th, Td } from "./StyleComponent";
import form from "../utils/formChange";

function AssembleData({ collectionName, processingData, setProcessingData }) {
    const collections = {
        bom: [
            "結構",
            ["產品編號", "系列", "材質", "色碼", "款式"],
            ["id", "group", "material", "color", "type"],
            ["零件編號", "型號"],
            ["id", "mark"],
            ["使用量", "單位", "順序"],
            ["qty", "unit", "index"],
        ],
    };

    function handleAddDataChange(index, e) {
        const newChildData = form.handleChange(
            index,
            e,
            processingData.childData,
        );
        const newProcessingData = processingData;
        newProcessingData.childData = newChildData;
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
                            <tr key={e.id}>
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
                            </tr>
                        ))}
                </tbody>
            </Table>
        </Section>
    );
}

export default AssembleData;
