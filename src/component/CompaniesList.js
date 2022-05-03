import List from "./List";
import { Flex } from "./StyleComponent";

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
