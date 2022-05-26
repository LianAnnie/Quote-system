import { useState, useEffect } from "react";
import Structure2 from "./component/AnalysisStructure";
import api from "./utils/api";
import { Container, Main } from "./component/StyleComponent";
import ErrorBoundary from "./admin/ErrorBoundary";

function Analysis() {
    const [productList, setProductList] = useState([]);
    const [partList, setPartList] = useState([]);
    const [bomList, setBomList] = useState([]);
    const parentCollectionName = "bom";
    const childCollectionName = "partQuotations2";
    const assembleCollectionName = "analysis";

    async function getListFromFirebase() {
        const list1 = await api.getCompleteCollection(parentCollectionName);
        setProductList(list1);
        const list2 = await api.getCompleteCollection(childCollectionName);
        setPartList(list2);
        const list3 = await api.getCompleteCollection(assembleCollectionName);
        setBomList(list3);
    }

    useEffect(() => {
        getListFromFirebase();
    }, []);

    return (
        <Container>
            <Main>
                <ErrorBoundary>
                    <Structure2
                        parentCollectionName={parentCollectionName}
                        parentList={productList}
                        childCollectionName={childCollectionName}
                        childList={partList}
                        assembleCollectionName={assembleCollectionName}
                        assembleList={bomList}
                        setAssembleList={setBomList}
                    />
                </ErrorBoundary>
            </Main>
        </Container>
    );
}

export default Analysis;
