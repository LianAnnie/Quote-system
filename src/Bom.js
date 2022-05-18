import { useState, useEffect } from "react";
import Product from "./component/Product";
import Part from "./component/Part";
import List from "./component/List";
import Structure from "./component/Structure";
import api from "./utils/api";
import * as S from "./component/StyleComponent";
import styled from "styled-components";

const FlexLayout = styled.div`
    display: flex;
    @media ${S.device.mobileL} {
        flex-wrap: wrap;
    }
    @media ${S.device.tablet} {
        flex-wrap: nowrap;
    }
`;

function Bom() {
    const [page, setPage] = useState(0);
    const [productList, setProductList] = useState([]);
    const [partList, setPartList] = useState([]);
    const [bomList, setBomList] = useState([]);
    const parentCollectionName = "products2";
    const childCollectionName = "parts2";
    const assembleCollectionName = "bom";

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
        <S.Container>
            <S.Main>
                <S.LefttMargi5>
                    <S.Flex>
                        <S.Button onClick={() => setPage(0)}>產品</S.Button>
                        <S.Button onClick={() => setPage(1)}>零件</S.Button>
                        <S.Button onClick={() => setPage(2)}>結構</S.Button>
                    </S.Flex>
                </S.LefttMargi5>

                {page === 0 ? (
                    <FlexLayout>
                        <Product
                            collectionName={parentCollectionName}
                            list={productList}
                            setList={setProductList}
                        />
                        <List
                            columnQty={8}
                            mode="structure"
                            collectionName={parentCollectionName}
                            list={productList}
                            setList={setProductList}
                        />
                    </FlexLayout>
                ) : page === 1 ? (
                    <FlexLayout>
                        <Part
                            columnQty={7}
                            collectionName={childCollectionName}
                            list={partList}
                            setList={setPartList}
                        />

                        <List
                            columnQty={7}
                            mode="structure"
                            collectionName={childCollectionName}
                            list={partList}
                            setList={setPartList}
                        />
                    </FlexLayout>
                ) : (
                    <Structure
                        parentCollectionName={parentCollectionName}
                        parentList={productList}
                        childCollectionName={childCollectionName}
                        childList={partList}
                        assembleCollectionName={assembleCollectionName}
                        assembleList={bomList}
                        setAssembleList={setBomList}
                    />
                )}
            </S.Main>
        </S.Container>
    );
}
export default Bom;
