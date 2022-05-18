import Input from "./Input";
import Select from "./Select";
import { Article, StructureForm, StructrueSingleLine } from "./StyleComponent";
import data from "../utils/data";
import PropTypes from "prop-types";

function Quotes({ handleDataChange, processingData, mode }) {
    const inputComponentArray = [
        {
            title: "報價日期",
            name: "date",
        },
        {
            title: "有效日期",
            name: "valid",
        },
    ];

    return (
        <Article>
            <StructureForm mode={mode}>
                {inputComponentArray.map(e => (
                    <StructrueSingleLine>
                        <Input
                            inputWidth={170}
                            key={e.title}
                            title={e.title}
                            type="date"
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

Quotes.propTypes = {
    handleDataChange: PropTypes.func.isRequired,
    processingData: PropTypes.object.isRequired,
    mode: PropTypes.string.isRequired,
};

export default Quotes;
