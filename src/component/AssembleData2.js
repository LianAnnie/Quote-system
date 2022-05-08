import {
    Article,
    Title,
    Table,
    Thead,
    AnalysisAssembledContainer,
    Td,
    TBody,
    Tr,
    ThTitle,
} from "./StyleComponent";
import form from "../utils/formChange";
import data from "../utils/data";

function AssembleData2({ collectionName, processingData, setProcessingData }) {
    return (
        <AnalysisAssembledContainer>
            <Table>
                <Thead>
                    <Tr>
                        {data.assembleDataCollections[collectionName][1].map(
                            (e, index) => (
                                <ThTitle key={index}>{e}</ThTitle>
                            ),
                        )}
                    </Tr>
                </Thead>
                <TBody>
                    <Tr>
                        {processingData &&
                            data.assembleDataCollections[collectionName][2].map(
                                (keyName, index) => (
                                    <Td mode="anlysis" key={index}>
                                        {processingData.parentData[keyName]}
                                    </Td>
                                ),
                            )}
                    </Tr>
                </TBody>
                <Thead>
                    <Tr>
                        {data &&
                            data.assembleDataCollections[collectionName][3].map(
                                (e, index) => (
                                    <ThTitle key={index}>{e}</ThTitle>
                                ),
                            )}
                    </Tr>
                </Thead>
                <TBody>
                    {processingData &&
                        processingData.childData.map((e, index) => (
                            <Tr key={[e.id, index]}>
                                {data.assembleDataCollections[
                                    collectionName
                                ][4].map(keyName => (
                                    <Td key={keyName}>{e[keyName]}</Td>
                                ))}
                            </Tr>
                        ))}
                </TBody>
            </Table>
        </AnalysisAssembledContainer>
    );
}

export default AssembleData2;
