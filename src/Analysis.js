import Structure2 from "./component/Structure2";
import api from "./utils/firebaseApi";
import { useState, useEffect } from "react";
import { Container, Main } from "./component/StyleComponent";
import ErrorBoundary from "./admin/ErrorBoundary";

function Analysis() {
    const [productList, setProductList] = useState([]);
    const [partList, setPartList] = useState([]);
    const [bomList, setBomList] = useState([]);
    const parentCollectionName = "bom";
    const childCollectionName = "partQuotations2";
    const assembleCollectionName = "analysis";

    useEffect(() => {
        getListFromFirebase();
    }, []);

    async function getListFromFirebase() {
        const list1 = await api.getCompleteCollection(parentCollectionName);
        setProductList(list1);
        const list2 = await api.getCompleteCollection(childCollectionName);
        setPartList(list2);
        const list3 = await api.getCompleteCollection(assembleCollectionName);
        setBomList(list3);
    }

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
