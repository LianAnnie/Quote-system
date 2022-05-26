import { useState, useEffect } from "react";
import styled from "styled-components";
import { Main } from "./component/StyleComponent";
import Structure from "./component/Structure";
import api from "./utils/api";

const Container = styled.div`
    text-align: left;
    background-color: #fffae3;
    min-height: 100vh;
    letter-spacing: 1px;
    padding-top: 45px;
`;

function Order() {
    const [parentList, setParentList] = useState([]);
    const [childList, setChildList] = useState([]);
    const [assembleList, setAssembleList] = useState([]);
    const parentCollectionName = "customers2";
    const childCollectionName = "products2";
    const assembleCollectionName = "order";

    async function getListFromFirebase() {
        const list1 = await api.getCompleteCollection(parentCollectionName);
        setParentList(list1);
        const list2 = await api.getCompleteCollection(childCollectionName);
        setChildList(list2);
        const list3 = await api.getCompleteCollection(assembleCollectionName);
        setAssembleList(list3);
    }

    useEffect(() => {
        getListFromFirebase();
    }, []);

    return (
        <Container>
            <Main>
                <Structure
                    parentCollectionName={parentCollectionName}
                    parentList={parentList}
                    childCollectionName={childCollectionName}
                    childList={childList}
                    assembleCollectionName={assembleCollectionName}
                    assembleList={assembleList}
                    setAssembleList={setAssembleList}
                />
            </Main>
        </Container>
    );
}

export default Order;
