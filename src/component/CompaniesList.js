import List from "./List";
import { device } from "./StyleComponent";
import styled from "styled-components";

const Flex = styled.div`
    flex-direction: column;
    margin: auto;
    width: 100%;
    @media ${device.laptop} {
        display: flex;
        justify-content: space-around;
    }
`;

function CompaniesList({
    customerList,
    supplierList,
    setCustomerList,
    setSupplierList,
}) {
    return (
        <Flex>
            <List
                collectionName={"customers2"}
                list={customerList}
                setList={setCustomerList}
            />
            <List
                collectionName={"suppliers2"}
                list={supplierList}
                setList={setSupplierList}
            />
        </Flex>
    );
}

export default CompaniesList;
