import {
    Table,
    Thead,
    AnalysisAssembledContainer,
    Td,
    TBody,
    Tr,
    ThTitle,
    StructureScrollbar,
} from "./StyleComponent";
import data from "../utils/data";

function AssembleData2({ collectionName, processingData, setProcessingData }) {
    return (
        <AnalysisAssembledContainer>
            <Table>
                <Thead>
                    <Tr>
                        {data.assembleDataCollections[collectionName][1].map(
                            (e, index) => (
                                <ThTitle mode="anlysis" key={index}>
                                    {e}
                                </ThTitle>
                            ),
                        )}
                    </Tr>
                </Thead>
                <TBody>
                    <Tr>
                        {processingData &&
                            data.assembleDataCollections[collectionName][2].map(
                                (keyName, index) =>
                                    keyName === "currency" ? (
                                        <Td mode="anlysis" key={index}>
                                            {processingData.parentData[
                                                keyName
                                            ]?.replace(",", "/")}
                                        </Td>
                                    ) : (
                                        <Td mode="anlysis" key={index}>
                                            {processingData.parentData[keyName]}
                                        </Td>
                                    ),
                            )}
                    </Tr>
                </TBody>
            </Table>
            <StructureScrollbar mode="assemble">
                <Table>
                    <Thead>
                        <Tr>
                            {data &&
                                data.assembleDataCollections[
                                    collectionName
                                ][3].map((e, index) => (
                                    <ThTitle
                                        mode="anlysis"
                                        key={index}
                                        index={index}
                                    >
                                        {e}
                                    </ThTitle>
                                ))}
                        </Tr>
                    </Thead>
                    <TBody>
                        {processingData &&
                            processingData.childData.map((e, index) => (
                                <Tr key={[e.id, index]}>
                                    {data.assembleDataCollections[
                                        collectionName
                                    ][4].map(keyName => (
                                        <Td key={keyName} mode="anlysis">
                                            {e[keyName]}
                                        </Td>
                                    ))}
                                </Tr>
                            ))}
                    </TBody>
                </Table>
            </StructureScrollbar>
        </AnalysisAssembledContainer>
    );
}

export default AssembleData2;
