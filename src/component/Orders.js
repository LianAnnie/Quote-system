import Input from "./Input";
import Select from "./Select";
import { Section, Form } from "./StyleComponent";
import data from "../utils/data";

function Orders({ handleDataChange, processingData }) {
    return (
        <Section>
            <Form>
                {data.order.inputComponentArray.map(e => (
                    <Input
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
        </Section>
    );
}

export default Orders;
