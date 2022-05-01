import { Section, Title, Table, Th, Td } from "./StyleComponent";
import form from "../utils/formChange";
import data from "../utils/data";

function AssembleData2({ collectionName, processingData, setProcessingData }) {
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
        setProcessingData(newProcessingData);
    }

    return (
        <Section>
            <Title>{data.assembleDataCollections[collectionName][0]}</Title>
            <Table>
                <thead>
                    <tr>
                        {data.assembleDataCollections[collectionName][1].map(
                            (e, index) => (
                                <Th key={index}>{e}</Th>
                            ),
                        )}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {processingData &&
                            data.assembleDataCollections[collectionName][2].map(
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
                        {data.assembleDataCollections[collectionName][3].map(
                            (e, index) => (
                                <Th key={index}>{e}</Th>
                            ),
                        )}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {processingData &&
                            data.assembleDataCollections[collectionName][4].map(
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
                        {data.assembleDataCollections[collectionName][5].map(
                            (e, index) => (
                                <Th key={index}>{e}</Th>
                            ),
                        )}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {processingData &&
                            data.assembleDataCollections[collectionName][6].map(
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
                        {data &&
                            data.assembleDataCollections[collectionName][7].map(
                                (e, index) => <Th key={index}>{e}</Th>,
                            )}
                    </tr>
                </thead>
                <tbody>
                    {processingData &&
                        processingData.childData.map((e, index) => (
                            <tr key={[e.id, index]}>
                                {data.assembleDataCollections[
                                    collectionName
                                ][8].map(keyName => (
                                    <Td key={keyName}>{e[keyName]}</Td>
                                ))}
                            </tr>
                        ))}
                </tbody>
            </Table>
        </Section>
    );
}

export default AssembleData2;
