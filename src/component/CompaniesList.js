import List from "./List";
import styled from "styled-components";
import ErrorBoundary from "../admin/ErrorBoundary";
import { device } from "./StyleComponent";

const CompaniesListLayout = styled.div`
    flex-direction: column;
    margin: auto;
    @media ${device.tablet} {
        width: 45%;
    }
    @media ${device.laptop} {
        width: 90%;
    }
    @media ${device.desktop} {
        width: calc(77vw - 250px);
        margin: 0px;
    }
`;

function CompaniesList({
    customerList,
    supplierList,
    setCustomerList,
    setSupplierList,
}) {
    return (
        <CompaniesListLayout>
            <ErrorBoundary>
                <List
                    columnQty={4}
                    collectionName={"customers2"}
                    mode="company"
                    list={customerList}
                    setList={setCustomerList}
                />
            </ErrorBoundary>
            <List
                columnQty={4}
                collectionName={"suppliers2"}
                mode="company"
                list={supplierList}
                setList={setSupplierList}
            />
        </CompaniesListLayout>
    );
}

export default CompaniesList;
