import SideBar from "./component/SideBar";
import { useState, useEffect } from "react";
import { Container, Main, Flex, Button } from "./component/StyleComponent";
// import Quotes from "./component/Quotes";
import Structure from "./component/Structure";
import api from "./utils/firebaseApi";

function Quote() {
    const [page, setPage] = useState(0);
    const [productList, setProductList] = useState([]);
    const [partList, setPartList] = useState([]);
    const [bomList, setBomList] = useState([]);
    const parentCollectionName = "suppliers2";
    const childCollectionName = "parts2";
    const assembleCollectionName = "partQuotations2";
    const inquiryQty = [250, 1000, 5000];

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
                    <Button onClick={() => setPage(0)}>零件報價</Button>
                    <Button onClick={() => setPage(1)}>產品報價</Button>
                </Flex>
                {/* {page === 0 ? ( */}
                <Structure
                    parentCollectionName={parentCollectionName}
                    parentList={productList}
                    childCollectionName={childCollectionName}
                    childList={partList}
                    assembleCollectionName={assembleCollectionName}
                    assembleList={bomList}
                    setAssembleList={setBomList}
                />
                {/* ) : (
                    <Quotes
                        collectionName={productCollectionName}
                        assembleCollectionName={productQuotationCollectionName}
                        inquiryQt={inquiryQty}
                    />
                )} */}
            </Main>
        </Container>
    );
}

export default Quote;
