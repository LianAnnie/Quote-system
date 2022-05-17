import Input from "./Input";
import Select from "./Select";
import {
    Article,
    Form,
    StructureForm,
    StructrueSingleLine,
} from "./StyleComponent";
import data from "../utils/data";

function Orders({ handleDataChange, processingData, mode }) {
    return (
        <Article>
            <StructureForm mode={mode}>
                {data.order.inputComponentArray.map(e => (
                    <StructrueSingleLine>
                        <Input
                            width={170}
                            key={e.title}
                            title={e.title}
                            type={e.type}
                            handleDataChange={handleDataChange}
                            data={processingData}
                            name={e.name}
                        />
                    </StructrueSingleLine>
                ))}

                <StructrueSingleLine>
                    <Select
                        title="幣別"
                        handleDataChange={handleDataChange}
                        name="currency"
                        optionArray={data.currencyList}
                    />
                </StructrueSingleLine>
            </StructureForm>
        </Article>
    );
}

export default Orders;
