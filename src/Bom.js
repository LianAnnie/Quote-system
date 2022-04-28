import { useState, useEffect } from "react";
import SideBar from "./component/SideBar";
import Product from "./component/Product";
import Part from "./component/Part";
import List from "./component/List";
import Structure from "./component/Structure";
import api from "./utils/firebaseApi";
import { Container, Main, Button, Flex } from "./component/StyleComponent";

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
            <SideBar />
            <Main>
                <Flex>
                    <Button onClick={() => setPage(0)}>產品</Button>
                    <Button onClick={() => setPage(1)}>零件</Button>
                    <Button onClick={() => setPage(2)}>結構</Button>
                </Flex>

                {page === 0 ? (
                    <>
                        <Product
                            collectionName={parentCollectionName}
                            list={productList}
                            setList={setProductList}
                        />
                        <List
                            collectionName={parentCollectionName}
                            list={productList}
                            setList={setProductList}
                        />
                    </>
                ) : page === 1 ? (
                    <>
                        <Part
                            collectionName={childCollectionName}
                            list={partList}
                            setList={setPartList}
                        />

                        <List
                            collectionName={childCollectionName}
                            list={partList}
                            setList={setPartList}
                        />
                    </>
                ) : (
                    <>
                        <Structure
                            parentCollectionName={parentCollectionName}
                            parentList={productList}
                            childCollectionName={childCollectionName}
                            childList={partList}
                            assembleCollectionName={assembleCollectionName}
                            assembleList={bomList}
                            setAssembleList={setBomList}
                        />
                    </>
                )}
            </Main>
        </Container>
    );
}
export default Bom;
