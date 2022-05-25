import PropTypes from "prop-types";
import data from "../utils/data";
import * as S from "./StyleComponent";

function AnalysisAssembleData({ collectionName, processingData }) {
    return (
        <S.AnalysisAssembledContainer>
            <S.Table>
                <S.Thead>
                    <S.Tr>
                        {data.assembleDataCollections[collectionName][
                            "mainDataTitle"
                        ].map((e, index) => (
                            <S.ThTitle mode="anlysis" key={index}>
                                {e}
                            </S.ThTitle>
                        ))}
                    </S.Tr>
                </S.Thead>
                <S.TBody>
                    <S.Tr>
                        {processingData &&
                            data.assembleDataCollections[collectionName][
                                "mainDataKey"
                            ].map((keyName, index) =>
                                keyName === "currency" ? (
                                    <S.Td mode="anlysis" key={index}>
                                        {processingData.parentData[
                                            keyName
                                        ]?.replace(",", "/")}
                                    </S.Td>
                                ) : (
                                    <S.Td mode="anlysis" key={index}>
                                        {processingData.parentData[keyName]}
                                    </S.Td>
                                ),
                            )}
                    </S.Tr>
                </S.TBody>
            </S.Table>
            <S.StructureScrollbar mode="assemble">
                <S.Table>
                    <S.Thead>
                        <S.Tr>
                            {data &&
                                data.assembleDataCollections[collectionName][
                                    "subDataTitle"
                                ].map((e, index) => (
                                    <S.ThTitle
                                        mode="anlysis"
                                        key={index}
                                        index={index}
                                    >
                                        {e}
                                    </S.ThTitle>
                                ))}
                        </S.Tr>
                    </S.Thead>
                    <S.TBody>
                        {processingData &&
                            processingData.childData.map((e, index) => (
                                <S.Tr key={[e.id, index]}>
                                    {data.assembleDataCollections[
                                        collectionName
                                    ]["subDataKey"].map(keyName => (
                                        <S.Td key={keyName} mode="anlysis">
                                            {e[keyName]}
                                        </S.Td>
                                    ))}
                                </S.Tr>
                            ))}
                    </S.TBody>
                </S.Table>
            </S.StructureScrollbar>
        </S.AnalysisAssembledContainer>
    );
}

AnalysisAssembleData.propTypes = {
    collectionName: PropTypes.string.isRequired,
    processingData: PropTypes.shape({
        id: PropTypes.string,
        childData: PropTypes.array,
        parentData: PropTypes.shape({
            caculatedMargin: PropTypes.number,
            caculatedPrice: PropTypes.number,
            class: PropTypes.string,
            color: PropTypes.string,
            currency: PropTypes.string,
            date: PropTypes.string,
            dependency: PropTypes.array,
            expectedPrice: PropTypes.string,
            expoectedMargin: PropTypes.string,
            group: PropTypes.string,
            id: PropTypes.array,
            mark: PropTypes.string,
            material: PropTypes.string,
            quoteQty: PropTypes.string,
            special: PropTypes.string,
            sum: PropTypes.number,
            type: PropTypes.string,
            valid: PropTypes.number,
        }),
    }),
};

export default AnalysisAssembleData;
