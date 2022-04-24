import styled from "styled-components";
import { useState, useEffect } from "react";
import SideBar from "./component/SideBar";
import Product from "./component/Product";
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
    const [page, setPage] = useState(0);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        getProductListFromFirebase();
    }, [setProductList]);

    async function getProductListFromFirebase() {
        const list = await api.getCompleteCollection("products2");
        setProductList(list);
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
                <Product list={productList} setList={setProductList} />
            </Main>
        </Container>
    );
}
export default Bom;
