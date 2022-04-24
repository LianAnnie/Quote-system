import styled from "styled-components";
import { useState, useEffect } from "react";
import SideBar from "./component/SideBar";
import Product from "./component/Product";
import Part from "./component/Part";
import ProductList from "./component/ProductList";
import api from "./utils/firebaseApi";

const Container = styled.div`
    text-align: left;
`;
const Main = styled.div`
    margin-left: 300px;
    padding: 50px 10%;
`;
const Button = styled.div`
    border: solid 1px #000000;
    width: 100px;
    margin: 5px;
    text-align: center;
    cursor: pointer;
`;
const Flex = styled.div`
    display: flex;
`;

function Bom() {
    const productRuleData = {
        id: ["P", "A", "A", "B", "NNNN", "T", "NN", "00"],
        //產品,燈具,系列,材質,色碼,桌燈,特殊備註
        class: "燈具",
        group: "w102",
        material: "黃銅",
        color: "材質本色",
        type: "桌燈",
        special: "無",
        mark: "",
    };
    const [page, setPage] = useState(0);
    const [productList, setProductList] = useState([]);
    const [partList, setPartList] = useState([]);

    useEffect(() => {
        getListFromFirebase();
    }, []);

    async function getListFromFirebase() {
        const list1 = await api.getCompleteCollection("products2");
        setProductList(list1);
        const list2 = await api.getCompleteCollection("parts2");
        setPartList(list2);
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
                <Product
                    collectionName="products2"
                    list={productList}
                    setList={setProductList}
                />
                <Part
                    collectionName="parts2"
                    list={partList}
                    setList={setPartList}
                />
                <ProductList list={productList} />
            </Main>
        </Container>
    );
}
export default Bom;
