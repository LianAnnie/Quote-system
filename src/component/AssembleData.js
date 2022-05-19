import * as S from "./StyleComponent";
import form from "../utils/formChange";
import data from "../utils/data";
import PropTypes from "prop-types";

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
        if (!e.id) {
            newChildData = form.handleDataChange(
                itemIndex,
                e.target.name,
                e.target.value,
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
        const qtyAvailable = data.filter(e => isNaN(Number(e.qty)));
        const priceAvailable = data.filter(e => isNaN(Number(e.price)));
        if ((qtyAvailable.length === 0) & (priceAvailable.length === 0)) {
            const sum = data.reduce(
                (sum, e) => sum + Number(e.qty) * Number(e.price),
                0,
            );
            return sum;
        }
        return "資料不完整";
    }
    return (
        <S.Section mode={mode + "assemble"}>
            <S.Title mode={mode}>
                {data.assembleDataCollections[collectionName][0]}
            </S.Title>
            <S.Flex page={page}>
                <S.AddScrollbar mode="assemble" page={page}>
                    <S.Table mode={mode + "assemble"}>
                        <S.Thead>
                            <S.Tr>
                                {data.assembleDataCollections[
                                    collectionName
                                ][1].map((e, index) => (
                                    <S.ThTitle mode={mode} key={index}>
                                        {e}
                                    </S.ThTitle>
                                ))}
                            </S.Tr>
                        </S.Thead>
                        <S.TBody>
                            <S.Tr>
                                {processingData &&
                                    data.assembleDataCollections[
                                        collectionName
                                    ][2].map((keyName, index) => (
                                        <S.Td mode={mode} key={index}>
                                            {processingData.parentData[keyName]}
                                        </S.Td>
                                    ))}
                            </S.Tr>
                        </S.TBody>
                    </S.Table>
                    <S.StructureScrollbar page={page}>
                        <S.Table page={page} mode="assemble">
                            <S.Thead>
                                <S.Tr>
                                    {data.assembleDataCollections[
                                        collectionName
                                    ][3].map((e, index) => (
                                        <S.ThTitle mode={mode} key={index}>
                                            {e}
                                        </S.ThTitle>
                                    ))}
                                    {page === 5
                                        ? data.assembleDataCollections[
                                              collectionName
                                          ][5].map((e, index) => (
                                              <S.ThTitle
                                                  mode={mode}
                                                  key={index}
                                              >
                                                  {e}
                                              </S.ThTitle>
                                          ))
                                        : null}
                                </S.Tr>
                            </S.Thead>
                            <S.TBody>
                                {processingData &&
                                    processingData.childData.map((e, index) => (
                                        <S.Tr key={[e.id, index]}>
                                            {data.assembleDataCollections[
                                                collectionName
                                            ][4].map(keyName => (
                                                <S.Td mode={mode} key={keyName}>
                                                    {e[keyName]}
                                                </S.Td>
                                            ))}
                                            {page === 5 ? (
                                                <>
                                                    {data.assembleDataCollections[
                                                        collectionName
                                                    ][6].map(
                                                        (
                                                            keyName,
                                                            indexArray,
                                                        ) => (
                                                            <>
                                                                {!e[keyName] ? (
                                                                    <S.Td
                                                                        key={
                                                                            indexArray
                                                                        }
                                                                    >
                                                                        <S.TableInput
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
                                                                    </S.Td>
                                                                ) : (
                                                                    <S.Td
                                                                        key={
                                                                            indexArray
                                                                        }
                                                                    >
                                                                        <S.TableInput
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
                                                                    </S.Td>
                                                                )}
                                                            </>
                                                        ),
                                                    )}
                                                    <S.TBodyTdButton>
                                                        <S.DeleteButton
                                                            onClick={() =>
                                                                handleAddDataChange(
                                                                    index,
                                                                    e,
                                                                )
                                                            }
                                                        />
                                                    </S.TBodyTdButton>
                                                </>
                                            ) : null}
                                        </S.Tr>
                                    ))}
                            </S.TBody>
                        </S.Table>
                    </S.StructureScrollbar>
                </S.AddScrollbar>
            </S.Flex>
        </S.Section>
    );
}

AssembleData.propTypes = {
    collectionName: PropTypes.string.isRequired,
    processingData: PropTypes.shape({
        id: PropTypes.string.isRequired,
        children: PropTypes.array,
        parentData: PropTypes.shape({
            class: PropTypes.string,
            color: PropTypes.string,
            dependency: PropTypes.array,
            group: PropTypes.string,
            id: PropTypes.array,
            mark: PropTypes.string,
            material: PropTypes.string,
            special: PropTypes.string,
            type: PropTypes.string,
        }),
    }),
    setProcessingData: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
};

export default AssembleData;
