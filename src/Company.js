import { useState, useEffect } from "react";
import Companies from "./component/Companies";
import CompaniesList from "./component/CompaniesList";
import api from "./utils/firebaseApi";
import { Container, Main } from "./component/StyleComponent";

function Company({ signOut }) {
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
            <Main>
                <Companies
                    customerList={customerList}
                    setCustomerList={setCustomerList}
                    supplierList={supplierList}
                    setSupplierList={setSupplierList}
                />
                <CompaniesList
                    customerList={customerList}
                    setCustomerList={setCustomerList}
                    supplierList={supplierList}
                    setSupplierList={setSupplierList}
                />
            </Main>
        </Container>
    );
}

export default Company;
