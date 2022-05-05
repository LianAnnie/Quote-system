import List from "./List";
import styled from "styled-components";

const CompaniesListLayout = styled.div`
    flex-direction: column;
    margin: auto;
    width: 100%;
`;

function CompaniesList({
    customerList,
    supplierList,
    setCustomerList,
    setSupplierList,
}) {
    return (
        <CompaniesListLayout>
            <List
                columnQty={4}
                collectionName={"customers2"}
                list={customerList}
                setList={setCustomerList}
            />
            <List
                columnQty={4}
                collectionName={"suppliers2"}
                list={supplierList}
                setList={setSupplierList}
            />
        </CompaniesListLayout>
    );
}

export default CompaniesList;
