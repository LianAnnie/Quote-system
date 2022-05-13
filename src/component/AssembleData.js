import {
    Section,
    Title,
    Table,
    Thead,
    TableInput,
    Td,
    TBody,
    Tr,
    DeleteButton,
    ThTitle,
    StructureScrollbar,
    TBodyTdButton,
    Flex,
} from "./StyleComponent";
import form from "../utils/formChange";
import data from "../utils/data";

function AssembleData({
    collectionName,
    processingData,
    setProcessingData,
    mode,
    page,
}) {
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
        if (collectionName === "order") {
            const sum = sumForOrder(newChildData);
            newProcessingData.parentData.sum = sum;
        }
        setProcessingData(newProcessingData);
    }

    function sumForOrder(data) {
        console.log(data);
        const qtyAvailable = data.filter(e => isNaN(Number(e.qty)));
        const priceAvailable = data.filter(e => isNaN(Number(e.price)));
        if ((qtyAvailable.length === 0) & (priceAvailable.length === 0)) {
            const sum = data.reduce(
                (sum, e) => sum + Number(e.qty) * Number(e.price),
                0,
            );
            return sum;
        }
        return "數量單價尚不完整";
    }
    return (
        <Section mode={mode + "assemble"}>
            <Title mode={mode}>
                {data.assembleDataCollections[collectionName][0]}
            </Title>
            <Flex page={page}>
                <Table mode={mode + "assemble"}>
                    <Thead>
                        <Tr>
                            {data.assembleDataCollections[
                                collectionName
                            ][1].map((e, index) => (
                                <ThTitle mode={mode} key={index}>
                                    {e}
                                </ThTitle>
                            ))}
                        </Tr>
                    </Thead>
                    <TBody>
                        <Tr>
                            {processingData &&
                                data.assembleDataCollections[
                                    collectionName
                                ][2].map((keyName, index) => (
                                    <Td mode={mode} key={index}>
                                        {processingData.parentData[keyName]}
                                    </Td>
                                ))}
                        </Tr>
                    </TBody>
                </Table>
                <StructureScrollbar page={page}>
                    <Table page={page} mode="assemble">
                        <Thead>
                            <Tr>
                                {data.assembleDataCollections[
                                    collectionName
                                ][3].map((e, index) => (
                                    <ThTitle mode={mode} key={index}>
                                        {e}
                                    </ThTitle>
                                ))}
                                {page === 5
                                    ? data.assembleDataCollections[
                                          collectionName
                                      ][5].map((e, index) => (
                                          <ThTitle mode={mode} key={index}>
                                              {e}
                                          </ThTitle>
                                      ))
                                    : null}
                            </Tr>
                        </Thead>
                        <TBody>
                            {processingData &&
                                processingData.childData.map((e, index) => (
                                    <Tr key={[e.id, index]}>
                                        {data.assembleDataCollections[
                                            collectionName
                                        ][4].map(keyName => (
                                            <Td mode={mode} key={keyName}>
                                                {e[keyName]}
                                            </Td>
                                        ))}
                                        {page === 5 ? (
                                            <>
                                                {data.assembleDataCollections[
                                                    collectionName
                                                ][6].map(
                                                    (keyName, indexArray) => (
                                                        <>
                                                            {e[keyName] ===
                                                            undefined ? (
                                                                <Td
                                                                    key={
                                                                        indexArray
                                                                    }
                                                                >
                                                                    <TableInput
                                                                        columnQty={
                                                                            8
                                                                        }
                                                                        name={
                                                                            keyName
                                                                        }
                                                                        onChange={e =>
                                                                            handleAddDataChange(
                                                                                index,
                                                                                e,
                                                                            )
                                                                        }
                                                                        key={
                                                                            keyName
                                                                        }
                                                                        placeholder="請填寫"
                                                                    />
                                                                </Td>
                                                            ) : (
                                                                <Td
                                                                    key={
                                                                        indexArray
                                                                    }
                                                                >
                                                                    <TableInput
                                                                        columnQty={
                                                                            7
                                                                        }
                                                                        name={
                                                                            keyName
                                                                        }
                                                                        onChange={e =>
                                                                            handleAddDataChange(
                                                                                index,
                                                                                e,
                                                                            )
                                                                        }
                                                                        key={
                                                                            keyName
                                                                        }
                                                                        value={
                                                                            e[
                                                                                keyName
                                                                            ]
                                                                        }
                                                                    />
                                                                </Td>
                                                            )}
                                                        </>
                                                    ),
                                                )}
                                                <TBodyTdButton>
                                                    <DeleteButton
                                                        onClick={() =>
                                                            handleAddDataChange(
                                                                index,
                                                                e,
                                                            )
                                                        }
                                                    />
                                                </TBodyTdButton>
                                            </>
                                        ) : null}
                                    </Tr>
                                ))}
                        </TBody>
                    </Table>
                </StructureScrollbar>
            </Flex>
        </Section>
    );
}

export default AssembleData;
