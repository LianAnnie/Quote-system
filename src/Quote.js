import { useState, useEffect } from "react";
import * as S from "./component/StyleComponent";
import Structure from "./component/Structure";
import api from "./utils/firebaseApi";

function Quote() {
    const [page, setPage] = useState(0);
    const [parentList, setParentList] = useState([]);
    const [childList, setChildList] = useState([]);
    const [assembleList, setAssembleList] = useState([]);
    const parentCollectionName = "suppliers2";
    const childCollectionName = "parts2";
    const assembleCollectionName = "partQuotations2";
    const [parentList1, setParentList1] = useState([]);
    const [childList1, setChildList1] = useState([]);
    const [assembleList1, setAssembleList1] = useState([]);
    const parentCollectionName1 = "customers2";
    const childCollectionName1 = "products2";
    const assembleCollectionName1 = "productQuotations2";

    useEffect(() => {
        getListFromFirebase();
    }, []);

    async function getListFromFirebase() {
        const list01 = await api.getCompleteCollection(parentCollectionName);
        setParentList(list01);
        const list02 = await api.getCompleteCollection(childCollectionName);
        setChildList(list02);
        const list03 = await api.getCompleteCollection(assembleCollectionName);
        setAssembleList(list03);
        const list11 = await api.getCompleteCollection(parentCollectionName1);
        setParentList1(list11);
        const list12 = await api.getCompleteCollection(childCollectionName1);
        setChildList1(list12);
        const list13 = await api.getCompleteCollection(assembleCollectionName1);
        setAssembleList1(list13);
    }

    return (
        <S.Container>
            <S.Main>
                <S.LefttMargi5>
                    <S.Flex>
                        <S.Button onClick={() => setPage(0)}>零件報價</S.Button>
                        <S.Button onClick={() => setPage(1)}>產品報價</S.Button>
                    </S.Flex>
                </S.LefttMargi5>
                {page === 0 ? (
                    <Structure
                        parentCollectionName={parentCollectionName}
                        parentList={parentList}
                        childCollectionName={childCollectionName}
                        childList={childList}
                        assembleCollectionName={assembleCollectionName}
                        assembleList={assembleList}
                        setAssembleList={setAssembleList}
                    />
                ) : (
                    <Structure
                        parentCollectionName={parentCollectionName1}
                        parentList={parentList1}
                        childCollectionName={childCollectionName1}
                        childList={childList1}
                        assembleCollectionName={assembleCollectionName1}
                        assembleList={assembleList1}
                        setAssembleList={setAssembleList1}
                    />
                )}
            </S.Main>
        </S.Container>
    );
}

export default Quote;
