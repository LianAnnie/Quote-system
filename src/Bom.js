import { useState, useEffect } from "react";
import Product from "./component/Product";
import Part from "./component/Part";
import List from "./component/List";
import Structure from "./component/Structure";
import api from "./utils/firebaseApi";
import {
    Container,
    Main,
    Button,
    Flex,
    LefttMargi5,
} from "./component/StyleComponent";

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
        <Container>
            <Main>
                <LefttMargi5>
                    <Flex>
                        <Button onClick={() => setPage(0)}>產品</Button>
                        <Button onClick={() => setPage(1)}>零件</Button>
                        <Button onClick={() => setPage(2)}>結構</Button>
                    </Flex>
                </LefttMargi5>

                {page === 0 ? (
                    <Flex>
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
                    </Flex>
                ) : page === 1 ? (
                    <Flex>
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
                    </Flex>
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
            </Main>
        </Container>
    );
}
export default Bom;
