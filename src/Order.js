import { Container, Main } from "./component/StyleComponent";
import Structure from "./component/Structure";
import { useState, useEffect } from "react";
import api from "./utils/firebaseApi";

function Order() {
    const [parentList, setParentList] = useState([]);
    const [childList, setChildList] = useState([]);
    const [assembleList, setAssembleList] = useState([]);
    const parentCollectionName = "customers2";
    const childCollectionName = "products2";
    const assembleCollectionName = "order";

    useEffect(() => {
        getListFromFirebase();
    }, []);

    async function getListFromFirebase() {
        const list1 = await api.getCompleteCollection(parentCollectionName);
        setParentList(list1);
        const list2 = await api.getCompleteCollection(childCollectionName);
        setChildList(list2);
        const list3 = await api.getCompleteCollection(assembleCollectionName);
        setAssembleList(list3);
    }

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
