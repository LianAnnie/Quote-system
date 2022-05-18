import { useState, useEffect } from "react";
import Companies from "./component/Companies";
import CompaniesList from "./component/CompaniesList";
import api from "./utils/firebaseApi";
import { Container, Main, device } from "./component/StyleComponent";
import styled from "styled-components";

const Flex = styled.div`
    display: flex;
    @media ${device.mobileL} {
        flex-wrap: wrap;
    }
    @media ${device.tablet} {
        flex-wrap: nowrap;
    }
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
        setCustomerList(list);
    }

    async function getSupplierListFromFirebase() {
        const list = await api.getCompleteCollection("suppliers2");
        setSupplierList(list);
    }

    return (
        <Container>
            <Main>
                <Flex>
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
                </Flex>
            </Main>
        </Container>
    );
}

export default Company;
