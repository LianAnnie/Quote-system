import styled from "styled-components";
import { useState, useEffect } from "react";
import SideBar from "./component/SideBar";
import Companies from "./component/Companies";
import CompaniesList from "./component/CompaniesList";
import api from "./utils/firebaseApi";

const Container = styled.div`
    text-align: left;
    background-color: #fffae3;
`;
const Main = styled.div`
    margin-left: 300px;
    padding: 50px 10%;
`;

function Company() {
    const [customerList, setCustomerList] = useState([]);
    const [supplierList, setSupplierList] = useState([]);

    useEffect(() => {
        getCustomerListFromFirebase();
        getSupplierListFromFirebase();
    }, []);

    async function getCustomerListFromFirebase() {
        const list = await api.getCompleteCollection("customers2");
        console.log(list);
        setCustomerList(list);
    }

    async function getSupplierListFromFirebase() {
        const list = await api.getCompleteCollection("suppliers2");
        console.log(list);
        setSupplierList(list);
    }

    return (
        <Container>
            <SideBar />
            <Main>
                <Companies
                    customerList={customerList}
                    setCustomerList={setCustomerList}
                    supplierList={supplierList}
                    setSupplierList={setSupplierList}
                />
                <CompaniesList
                    customerList={customerList}
                    supplierList={supplierList}
                />
            </Main>
        </Container>
    );
}

export default Company;
