import { useState, useEffect } from "react";
import Companies from "./component/Companies";
import CompaniesList from "./component/CompaniesList";
import api from "./utils/firebaseApi";
import { Container, Main, device } from "./component/StyleComponent";
import styled from "styled-components";

const Flex = styled.div`
    display: flex;
    @media ${device.mobileS} {
        flex-direction: column;
        width: 100vw;
    }
    @media ${device.mobileL} {
        flex-direction: column;
        width: 100vw;
    }
    @media ${device.tablet} {
        flex-direction: row;
        width: 98vw;
    }
    @media ${device.desktop} {
        flex-direction: row;
        width: calc(98vw - 250px);
    } ;
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
