import Input from "./Input";
import Select from "./Select";
import { Article, Form } from "./StyleComponent";
import data from "../utils/data";

function Orders({ handleDataChange, processingData, mode }) {
    return (
        <Article>
            <Form mode={mode}>
                {data.order.inputComponentArray.map(e => (
                    <Input
                        width={170}
                        key={e.title}
                        title={e.title}
                        type={e.type}
                        handleDataChange={handleDataChange}
                        data={processingData}
                        name={e.name}
                    />
                ))}
                <Select
                    title="幣別"
                    handleDataChange={handleDataChange}
                    name="currency"
                    optionArray={data.currencyList}
                />
            </Form>
        </Article>
    );
}

export default Orders;
