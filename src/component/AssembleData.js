import {
    Section,
    Title,
    TableStyled,
    Th,
    Td,
    DeleteButton,
} from "./StyleComponent";
import form from "../utils/formChange";
import data from "../utils/data";

function AssembleData({ collectionName, processingData, setProcessingData }) {
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
        <Section>
            <Title>{data.assembleDataCollections[collectionName][0]}</Title>
            <TableStyled>
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
                        {data.assembleDataCollections[collectionName][5].map(
                            (e, index) => (
                                <Th key={index}>{e}</Th>
                            ),
                        )}
                    </tr>
                </thead>
                <tbody>
                    {processingData &&
                        processingData.childData.map((e, index) => (
                            <tr key={[e.id, index]}>
                                {data.assembleDataCollections[
                                    collectionName
                                ][4].map(keyName => (
                                    <Td key={keyName}>{e[keyName]}</Td>
                                ))}
                                {data.assembleDataCollections[
                                    collectionName
                                ][6].map(keyName => (
                                    <Td key={keyName}>
                                        {e[keyName] === undefined ? (
                                            <input
                                                name={keyName}
                                                onChange={e =>
                                                    handleAddDataChange(
                                                        index,
                                                        e,
                                                    )
                                                }
                                                key={keyName}
                                                value="請填寫資料"
                                            />
                                        ) : (
                                            <input
                                                name={keyName}
                                                onChange={e =>
                                                    handleAddDataChange(
                                                        index,
                                                        e,
                                                    )
                                                }
                                                key={keyName}
                                                value={e[keyName]}
                                            />
                                        )}
                                    </Td>
                                ))}
                                <Td>
                                    <DeleteButton
                                        onClick={() =>
                                            handleAddDataChange(index, e)
                                        }
                                    />
                                </Td>
                            </tr>
                        ))}
                </tbody>
            </TableStyled>
        </Section>
    );
}

export default AssembleData;
