import List from "./List";

function CompaniesList({
    customerList,
    supplierList,
    setCustomerList,
    setSupplierList,
}) {
    return (
        <>
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
        </>
    );
}

export default CompaniesList;
