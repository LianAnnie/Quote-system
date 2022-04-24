import List from "./List";

function CompaniesList({ customerList, supplierList }) {
    return (
        <>
            <List collectionName={"customers2"} list={customerList} />
            <List collectionName={"suppliers2"} list={supplierList} />
        </>
    );
}

export default CompaniesList;
